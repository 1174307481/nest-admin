import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { Picture } from '~/modules/appManage/picture/picture.entity'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import {
  definePermission,
  Perm,
} from '~/modules/auth/decorators/permission.decorator'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { UserEntity } from '~/modules/user/user.entity'
import { UserFavoriteService } from './user-favorite.service'

export const permissions = definePermission('app:favorites', {
  ADD: 'add',
  CANCEL: 'cancel',
  LIST: 'list',
} as const)

@ApiSecurityAuth()
@ApiTags('User Favorite')
@Controller('appUserFavorites')
@UseGuards(JwtAuthGuard)
export class UserFavoriteController {
  constructor(private userFavoriteService: UserFavoriteService) {}

  @Post(':pictureId')
  @ApiOperation({ summary: '添加收藏' })
  @Perm(permissions.ADD)
  async addFavorite(
    @Param('pictureId') pictureId: number,
    @AuthUser() user: UserEntity,
  ) {
    await this.userFavoriteService.addFavorite(user.id, pictureId)
  }

  @Delete(':pictureId')
  @ApiOperation({ summary: '取消收藏' })
  @Perm(permissions.CANCEL)
  async removeFavorite(
    @Param('pictureId') pictureId: number,
    @AuthUser() user: UserEntity,
  ) {
    await this.userFavoriteService.removeFavorite(user.id, pictureId)
  }

  @Get()
  @ApiOperation({ summary: '查询用户收藏' })
  @ApiResult({ type: [Picture], isPage: true })
  @Perm(permissions.LIST)
  async getUserFavorites(
    @AuthUser() user: UserEntity,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<Pagination<Picture>> {
    return this.userFavoriteService.getUserFavorites(user.id, page, pageSize)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询其他用户收藏' })
  @ApiResult({ type: [Picture], isPage: true })
  @Perm(permissions.LIST)
  async getOtherUserFavorites(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<Pagination<Picture>> {
    return this.userFavoriteService.getUserFavorites(id, page, pageSize)
  }
}
