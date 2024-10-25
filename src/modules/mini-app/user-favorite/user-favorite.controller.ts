import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { UserEntity } from '~/modules/user/user.entity'
import { UserFavoriteService } from './user-favorite.service'

@ApiTags('User Favorite')
@Controller('user-favorites')
@UseGuards(AuthGuard)
export class UserFavoriteController {
  constructor(private userFavoriteService: UserFavoriteService) {}

  @Post(':itemId')
  @ApiOperation({ summary: '添加收藏' })
  async addFavorite(@Param('itemId') itemId: number, @AuthUser() user: UserEntity) {
    await this.userFavoriteService.addFavorite(user.id, itemId)
  }

  @Delete(':itemId')
  @ApiOperation({ summary: '取消收藏' })
  async removeFavorite(@Param('itemId') itemId: number, @AuthUser() user: UserEntity) {
    await this.userFavoriteService.removeFavorite(user.id, itemId)
  }

  @Get()
  @ApiOperation({ summary: '查询用户收藏' })
  async getUserFavorites(@AuthUser() user: UserEntity) {
    return this.userFavoriteService.getUserFavorites(user.id)
  }
}
