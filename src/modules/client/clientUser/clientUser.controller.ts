import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import {
  definePermission,
  Perm,
} from '~/modules/auth/decorators/permission.decorator'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { UserEntity } from '~/modules/user/user.entity'
import { ClientUserService } from './clientUser.service'

export const permissions = definePermission('app:user', {
  READ: 'read',
  UPDATE: 'update',
} as const)

@ApiTags('Client - User')
@Controller('clientUser')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClientUserController {
  constructor(private readonly clientUserService: ClientUserService) {}

  @Get('info')
  @ApiOperation({ summary: '获取用户信息' })
  @Perm(permissions.READ)
  async getUserInfo(@AuthUser() user: UserEntity) {
    return this.clientUserService.getUserInfo(user.id)
  }

  @Put('update')
  @ApiOperation({ summary: '更新用户信息' })
  @Perm(permissions.UPDATE)
  async updateUserInfo(
    @AuthUser() user: UserEntity,
    @Body() updateData: Partial<UserEntity>,
  ) {
    return this.clientUserService.updateUserInfo(user.id, updateData)
  }

  @Get('own-info')
  @ApiOperation({ summary: '获取自己的用户信息' })
  @Perm(permissions.READ)
  async getOwnUserInfo(@AuthUser() user: UserEntity) {
    return this.clientUserService.getOwnUserInfo(user.id)
  }

  @Get('other-info')
  @ApiOperation({ summary: '获取其他用户信息' })
  @Public()
  async getOtherUserInfo(@Query() query: { userId: number }) {
    return this.clientUserService.getOtherUserInfo(query.userId)
  }
}
