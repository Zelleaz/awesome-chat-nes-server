import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './media.model';
import { Message } from '../message/message.model';
import { UploadMediaFilesDto } from './dto/upload-media-files-dto';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaRepository: typeof Media) {}

  private async pushMediaDataToDb(file: Express.Multer.File, dto: UploadMediaFilesDto) {
    await this.mediaRepository.create({
      messageId: dto.messageId,
      path: file.path,
      roomId: dto.roomId
    })
  }

  public async getRoomMedia(roomId: number, offset: number) {
    const media = await this.mediaRepository.findAll({
      where: { roomId },
      limit: 15,
      order: [
        ['id', 'DESC']
      ],
      offset,
      include: Message
    })
    return media
  }

  public uploadMediaFiles(files: Array<Express.Multer.File>, dto: UploadMediaFilesDto) {
    const paths: string[] = []

    files.forEach(async file => {
      await this.pushMediaDataToDb(file, dto)
      paths.push(file.path)
    })

    return paths
  }
}
