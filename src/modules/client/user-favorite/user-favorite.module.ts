import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from '~/modules/appManage/picture/picture.entity'
import { PictureModule } from '~/modules/appManage/picture/picture.module'
import { AuthModule } from '~/modules/auth/auth.module'
import { UserEntity } from '~/modules/user/user.entity'
import { UserModule } from '~/modules/user/user.module'
import { UserFavoriteController } from './user-favorite.controller'
import { UserFavoriteService } from './user-favorite.service'

@Module({
  imports: [
    UserModule,
    PictureModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, Picture]),
  ],
  providers: [UserFavoriteService],
  controllers: [UserFavoriteController],
})
export class UserFavoriteModule {}
