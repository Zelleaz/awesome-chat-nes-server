import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { MessageDto } from './dto/message-dto';
import { StatusDto } from './dto/status-dto';
import { JoinDto } from './dto/join-dto';
import { HandleChatCreatedDto } from './dto/handle-chat-created-dto';

@WebSocketGateway( {
  cors: {
    origin: '*'
  },
  transports: ['websocket']
})
export class WebsocketsGateway {
  @WebSocketServer()
  private readonly server: Server

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: MessageDto,
    @ConnectedSocket() socket: any
  ) {
    socket.broadcast.emit('message', data)
  }

  @SubscribeMessage('status')
  handleStatus(
    @MessageBody() data: StatusDto,
    @ConnectedSocket() socket: any
  ) {
    socket.broadcast.emit('status', data)
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: JoinDto,
    @ConnectedSocket() socket: any
  ) {
    socket.broadcast.emit('join', data)
  }

  @SubscribeMessage('chat_created')
  handleChatCreated(
    @MessageBody() data: HandleChatCreatedDto,
    @ConnectedSocket() socket: any
  ) {
    socket.broadcast.emit('chat_created', data)
  }
}
