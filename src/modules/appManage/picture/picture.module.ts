import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from '~/modules/appManage/category/category.module'

import { AuthModule } from '~/modules/auth/auth.module'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { StorageModule } from '~/modules/tools/storage/storage.module'
import { UploadModule } from '~/modules/tools/upload/upload.module'
import { PictureController } from './picture.controller'
import { Picture } from './picture.entity'
import { PictureService } from './picture.service'

@Module({
  imports: [
    UploadModule,
    CategoryModule,
    AuthModule,
    forwardRef(() => StorageModule),
    TypeOrmModule.forFeature([Picture, Storage]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
