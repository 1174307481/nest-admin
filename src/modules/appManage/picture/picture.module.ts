import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from '~/modules/appManage/category/category.module'

import { AuthModule } from '~/modules/auth/auth.module'
import { UploadModule } from '~/modules/tools/upload/upload.module'
import { PictureAuditModule } from '../pictureAudit/pictureAudit.module'
import { PictureController } from './picture.controller'
import { Picture } from './picture.entity'
import { PictureService } from './picture.service'

@Module({
  imports: [
    UploadModule,
    CategoryModule,
    AuthModule,
    forwardRef(() => PictureAuditModule),
    TypeOrmModule.forFeature([Picture]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
