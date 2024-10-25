import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserFavoriteController } from './user-favorite.controller'
import { UserFavorite } from './user-favorite.entity'
import { UserFavoriteService } from './user-favorite.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserFavorite])],
  providers: [UserFavoriteService],
  controllers: [UserFavoriteController],
})
export class UserFavoriteModule {}
