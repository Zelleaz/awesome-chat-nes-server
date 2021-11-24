export class MessageDto {
  id: number
  body: string
  creationDate: string
  isEdited: boolean
  starredByUserIds: []
  userId: number
  userName: string
  roomId: number
  pageType: number
}