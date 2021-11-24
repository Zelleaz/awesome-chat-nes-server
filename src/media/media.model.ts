import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Room } from '../room/room.model';
import { Message } from '../message/message.model';

interface MediaCreationAttrs {
  path: string
  roomId: number
  messageId: number
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, MediaCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  path: string

  @ForeignKey(() => Room)
  roomId: number

  @BelongsTo(() => Room)
  room: Room

  @ForeignKey(() => Message)
  messageId: number

  @BelongsTo(() => Message)
  message: Message
}