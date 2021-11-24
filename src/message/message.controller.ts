import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message-dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('/:roomId')
  async getMessages(
    @Param('roomId') roomId: number,
    @Query('offset') offset: number
  ) {
    const messages = await this.messageService.getMessages(roomId, offset)
    return messages
  }

  @Post('/')
  async sendMessage(@Body() dto: SendMessageDto) {
    const message = await this.messageService.sendMessage(dto)
    return message
  }
}
