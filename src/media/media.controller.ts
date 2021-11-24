import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { UploadMediaFilesDto } from './dto/upload-media-files-dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {

  constructor(private mediaService: MediaService) {}

  @Get('/room/:roomId')
  public async getRoomMedia(
    @Param('roomId') roomId: number,
    @Query('offset') offset: number
  ) {
    const media = await this.mediaService.getRoomMedia(roomId, offset)
    return media
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor({
    limits: {
      files: 10
    },
    storage: diskStorage({
      destination: 'uploads/',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  public async uploadMediaFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UploadMediaFilesDto
  ) {
    const paths = this.mediaService.uploadMediaFiles(files, dto)
    return paths
  }
}
