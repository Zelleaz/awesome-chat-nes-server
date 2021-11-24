import { RoomTypes } from '../../types';

export class HandleChatCreatedDto  {
  id: number
  name: string
  type: RoomTypes
  imgUrl: string
  lastMessageBody: string
  lastMessageDate: string
  lastAuthor: number
  users: any[]
}