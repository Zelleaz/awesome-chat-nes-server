import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePersonalRoomDto } from './dto/create-personal-room-dto';
import { RoomService } from './room.service';
import { ChangeLastDataDto } from './dto/change-last-data.dto';
import { ClearNewMessagesDto } from './dto/clear-new-messages-dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/search/:query')
  async searchGroupRooms(@Param('query') query: string) {
    const rooms = await this.roomService.searchGroupRooms(query)
    return rooms
  }

  @Get('/by_id/:id')
  async searchRoomById(@Param('id') id: number) {
    const room = await this.roomService.searchRoomById(id)
    return room
  }

  @Post('/create')
  async createPersonalRoom(@Body() dto: CreatePersonalRoomDto) {
    const relations = await this.roomService.createPersonalRoom(dto)
    return relations
  }

  @Get('/relation/:userId')
  async getRelation(
    @Query('roomId') roomId: number,
    @Param('userId') userId: number
  ) {
    const relation = await this.roomService.getRelation(roomId, userId)
    return relation
  }

  @Put('/last_data')
  async changeLastData(@Body() dto: ChangeLastDataDto) {
    const res = await this.roomService.changeLastData(dto)
    return res
  }

  @Put('/new_messages')
  async clearNewMessages(@Body() dto: ClearNewMessagesDto) {
    const updated = await this.roomService.clearNewMessages(dto)
    return updated
  }
}
