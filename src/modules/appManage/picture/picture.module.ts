import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from '~/modules/appManage/category/category.module'

import { AuthModule } from '~/modules/auth/auth.module'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UploadModule } from '~/modules/tools/upload/upload.module'
import { UserModule } from '~/modules/user/user.module'
import { CategoryEntity } from '../category/category.entity'
import { PictureAuditModule } from '../pictureAudit/pictureAudit.module'
import { PictureController } from './picture.controller'
import { Picture } from './picture.entity'
import { PictureService } from './picture.service'

@Module({
  imports: [
    UploadModule,
    CategoryModule,
    UserModule,
    AuthModule,
    forwardRef(() => PictureAuditModule),
    TypeOrmModule.forFeature([Picture, Storage, CategoryEntity]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
