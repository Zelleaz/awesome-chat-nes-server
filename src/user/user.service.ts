import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { Op } from 'sequelize'
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto, RegisterUserDto } from './dto/register-user-dto';
import { RoomTypes, UserStatuses } from '../types';
import { Room } from '../room/room.model';
import { Message } from '../message/message.model';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  private async getByName(name: string) {
    const user = await this.userRepository.findOne({ where: { name } })
    return user
  }

  public async register(dto: RegisterUserDto) {
    const candidate = await this.getByName(dto.name)

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN)
    }

    const user = await this.userRepository.create(dto)
    return user
  }

  public async login(dto: LoginUserDto) {
    const user = await this.getByName(dto.name)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    if (user.password === dto.password) {
      return user
    }

    throw new UnauthorizedException({ message: 'Wrong login or password' })
  }

  public async changeStatus(userId: number, status: UserStatuses) {
    const updated = await this.userRepository.update({
      status
    }, {where: { id: userId }})
    return updated
  }

  public async search(query: string, userName: string) {
    const result = await this.userRepository.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
          [Op.notLike]: `%${userName}%`
        }
      }
    })
    return result
  }

  public async getPersonalRooms(userId: number) {
    const { rooms } = await this.userRepository.findByPk(userId, {
      include: {
        model: Room,
        where: {
          type: RoomTypes.PERSONAL
        },
        include: [User, {
          model: Message,
          limit: 1,
          order: [
            ['id', 'DESC']
          ]
        }]
      }
    })
    return rooms
  }

  public async getGroupRooms(userId: number) {
    const data = await this.userRepository.findByPk(userId,{
      include: {
        model: Room,
        where: {
          type: RoomTypes.GROUP
        }
      }
    })

    if (!data?.rooms) {
      return []
    }

    return data?.rooms
  }
}


