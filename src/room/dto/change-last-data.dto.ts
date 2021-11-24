export class ChangeLastDataDto {
  readonly receiverId: number
  readonly roomId: number
  readonly lastMessageBody: string
  readonly lastMessageDate: string
  readonly lastMessageAuthorId: number
}