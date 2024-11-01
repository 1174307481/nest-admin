import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from '~/modules/appManage/picture/picture.entity'
import { PictureModule } from '~/modules/appManage/picture/picture.module'
import { UserEntity } from '~/modules/user/user.entity'
import { UserModule } from '~/modules/user/user.module'
import { ClientPictureController } from './clientPicture.controller'
import { ClientPictureService } from './clientPicture.service'

@Module({
  imports: [
    UserModule,
    PictureModule,
    TypeOrmModule.forFeature([UserEntity, Picture]),
  ],
  providers: [ClientPictureService],
  controllers: [ClientPictureController],
})
export class ClientPictureModule {}
