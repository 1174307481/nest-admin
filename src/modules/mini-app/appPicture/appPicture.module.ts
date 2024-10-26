import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from '~/modules/appManage/picture/picture.entity'
import { PictureModule } from '~/modules/appManage/picture/picture.module'
import { UserEntity } from '~/modules/user/user.entity'
import { UserModule } from '~/modules/user/user.module'
import { AppPictureController } from './appPicture.controller'
import { AppPictureService } from './appPicture.service'

@Module({
  imports: [
    UserModule,
    PictureModule,
    TypeOrmModule.forFeature([UserEntity, Picture]),
  ],
  providers: [AppPictureService],
  controllers: [AppPictureController],
})
export class AppPictureModule {}
