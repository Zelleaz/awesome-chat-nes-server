import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './room.model';
import { RoomUsers } from './room-users.model';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports: [
    SequelizeModule.forFeature([Room, RoomUsers])
  ]
})
export class RoomModule {}
