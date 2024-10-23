import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Storage } from '../storage/storage.entity'

import { StorageModule } from '../storage/storage.module'
import { PictureController } from './picture.controller'
import { Picture } from './picture.entity'
import { PictureService } from './picture.service'

@Module({
  imports: [
    forwardRef(() => StorageModule),
    TypeOrmModule.forFeature([Picture, Storage]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
