import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Room } from './room.model';
import { User } from '../user/user.model';

interface RoomUsersCreationAttrs {
  userId: number
  roomId: number
}

@Table({ tableName: 'room_users' })
export class RoomUsers extends Model<RoomUsers, RoomUsersCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER })
  roomId: number

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  isFavorite: boolean

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  newMessageCount: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean

  @Column({ type: DataType.BOOLEAN, defaultValue: false})
  isMuted: boolean
}