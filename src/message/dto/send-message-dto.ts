export class SendMessageDto {
  readonly userName: string
  readonly userId: number
  readonly body: string
  readonly roomId: number
  readonly creationDate: string
  readonly media: string[]
}