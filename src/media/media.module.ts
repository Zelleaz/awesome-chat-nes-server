import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Media } from './media.model';

@Module({
  providers: [MediaService],
  controllers: [MediaController],
  imports: [
    SequelizeModule.forFeature([Media])
  ]
})
export class MediaModule {}
