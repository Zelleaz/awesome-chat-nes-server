import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { RoomTypes } from '../types';
import { User } from '../user/user.model';
import { RoomUsers } from './room-users.model';
import { Message } from '../message/message.model';
import { Media } from '../media/media.model';

interface RoomCreationAttrs {
  name: string
  type: RoomTypes
}

@Table({ tableName: 'room' })
export class Room extends Model<Room, RoomCreationAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  name: string

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: RoomTypes.PERSONAL })
  type: RoomTypes

  @Column({ type: DataType.STRING, allowNull: true })
  imgUrl: string

  @Column({ type: DataType.STRING, allowNull: true })
  lastMessageBody: string

  @Column({ type: DataType.STRING, allowNull: true })
  lastMessageDate: string

  @Column({ type: DataType.INTEGER, allowNull: true })
  lastAuthorId: number

  @HasMany(() => Media)
  media: Media[]

  @HasMany(() => Message)
  messages: Message[]

  @BelongsToMany(() => User, () => RoomUsers)
  users: User[]
}