import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { RoomTypes } from '../types';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { CreatePersonalRoomDto } from './dto/create-personal-room-dto';
import { RoomUsers } from './room-users.model';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';
import { ChangeLastDataDto } from './dto/change-last-data.dto';
import { ClearNewMessagesDto } from './dto/clear-new-messages-dto';

@Injectable()
export class RoomService {

  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(RoomUsers) private roomUsersRepository: typeof RoomUsers
  ) {}

  private async findRoomByUserId(userId: number) {
    const room = await this.roomUsersRepository.findOne({
      where: {
        userId
      }
    })
    return room
  }

  public async changeLastData(dto: ChangeLastDataDto) {
    const updated = await this.roomRepository.update({
      lastMessageBody: dto.lastMessageBody,
      lastAuthorId: dto.lastMessageAuthorId,
      lastMessageDate: dto.lastMessageDate,
    }, {
      where: { id: dto.roomId }
    })
    await this.roomUsersRepository.increment({
      newMessageCount: 1
    }, {
      where: {
        userId: dto.receiverId,
        roomId: dto.roomId
      }
    })
    return updated
  }

  private async searchRoomByName(name: string) {
    const room = await this.roomRepository.findOne({ where: { name } })
    return room
  }

  public async searchGroupRooms(query: string) {
    const rooms = await this.roomRepository.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        },
        type: RoomTypes.GROUP,
      },
      include: Message
    })
    return rooms
  }

  public async searchRoomById(id: number) {
    const room = await this.roomRepository.findByPk(id, {
      include: [User]
    })
    return room
  }

  public async pinUserToRoom(userId: number, roomId: number) {
    const relation = await this.roomUsersRepository.create({
      roomId,
      userId,
    })
    return relation
  }

  public async createPersonalRoom(dto: CreatePersonalRoomDto) {
    const first = await this.searchRoomByName(`${dto.firstName}/${dto.secondName}`)
    const second = await this.searchRoomByName(`${dto.secondName}/${dto.firstName}`)

    if (first || second) {
      return {
        room: first ?? second,
        created: false
      }
    }

    const room = await this.roomRepository.create({
      name: `${dto.firstName}/${dto.secondName}`,
      type: RoomTypes.PERSONAL
    })

    const firstRelation = await this.pinUserToRoom(dto.firstUserId, room.id)
    const secondRelation = await this.pinUserToRoom(dto.secondUserId, room.id)

    return {
      first: firstRelation,
      second: secondRelation,
      created: true
    }
  }

  public async getRelation(roomId: number, userId: number) {
    const relation = await this.roomUsersRepository.findOne({
      where: { roomId, userId }
    })
    return relation
  }

  public async clearNewMessages(dto: ClearNewMessagesDto) {
    const update = await this.roomUsersRepository.update({
      newMessageCount: '0'
    }, {
      where: {
        roomId: dto.roomId,
        userId: dto.userId
      }
    })
    return update
  }
}
