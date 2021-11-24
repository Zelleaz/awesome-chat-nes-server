import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.model';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [
    SequelizeModule.forFeature([Message])
  ]
})
export class MessageModule {}
