import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserStatuses } from '../types';
import { Room } from '../room/room.model';
import { RoomUsers } from '../room/room-users.model';
import { Message } from '../message/message.model';

interface UserCreationAttrs {
  name: string
  password: string
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @Column({ type: DataType.INTEGER, defaultValue: UserStatuses.ONLINE, allowNull: false })
  status: UserStatuses

  @Column({ type: DataType.STRING, allowNull: true })
  lastOnline: string

  @Column({ type: DataType.STRING, allowNull: true })
  imgUrl: string

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string

  @BelongsToMany(() => Room, () => RoomUsers)
  rooms: Room[]

  @HasMany(() => Message)
  messages: Message[]
}