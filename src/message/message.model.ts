import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Sequelize, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Room } from '../room/room.model';
import { Media } from '../media/media.model';

interface MessageCreationAttrs{
  body: string
  userId: number
  userName: string
  creationDate: string
  media: string[]
}

@Table({ tableName: 'message', timestamps: false })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number

  @Column({ type: DataType.TEXT, allowNull: false })
  body: string

  @Column({ type: DataType.STRING, allowNull: false })
  creationDate: string

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  isEdited: boolean

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true, defaultValue: [] })
  starredByUserIds: number[]

  @Column({})
  @ForeignKey(() => User)
  userId: number

  @HasMany(() => Media)
  medias: Media[]

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Room)
  @Column
  roomId: number

  @BelongsTo(() => Room)
  room: Room
}