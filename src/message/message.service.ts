import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { Media } from '../media/media.model';
import { Room } from '../room/room.model';
import { User } from '../user/user.model';

@Injectable()
export class MessageService {

  constructor(@InjectModel(Message) private messageRepository: typeof Message) {}

  private async getMessageById(messageId: number) {
    const message = await this.messageRepository.findByPk(messageId, {
      include: User
    })
    return message
  }

  async getMessages(roomId: number, offset: number) {
    const messages = await this.messageRepository.findAll({
      where: { roomId },
      order: [
        ['id', 'DESC']
      ],
      limit: 15,
      offset,
      include: [Media, {
        model: Room,
        include: [User]
      }]
    })
    return messages
  }

  async sendMessage(dto: SendMessageDto) {
    const res = await this.messageRepository.create(dto)
    const message = await this.getMessageById(res.id)
    return message
  }
}
