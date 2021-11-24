import { Module } from '@nestjs/common';
import { join } from 'path'
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { MediaModule } from './media/media.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { RoomUsers } from './room/room-users.model';
import { Room } from './room/room.model';
import { Message } from './message/message.model';
import { Media } from './media/media.model';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    UserModule,
    RoomModule,
    MessageModule,
    MediaModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.DB_ADMIN,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [User, RoomUsers, Room, Message, Media],
      autoLoadModels: true
    }),
    WebsocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
