import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { UserEntity } from '~/modules/user/user.entity'
import { AppUserService } from './appUser.service'

export const permissions = definePermission('app:user', {
  READ: 'read',
  UPDATE: 'update',
} as const)

@ApiTags('App - User')
@Controller('appUuser')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Get('info')
  @ApiOperation({ summary: '获取用户信息' })
  @Perm(permissions.READ)
  async getUserInfo(@AuthUser() user: UserEntity) {
    return this.appUserService.getUserInfo(user.id)
  }

  @Put('info')
  @ApiOperation({ summary: '更新用户信息' })
  @Perm(permissions.UPDATE)
  async updateUserInfo(@AuthUser() user: UserEntity, @Body() updateData: Partial<UserEntity>) {
    return this.appUserService.updateUserInfo(user.id, updateData)
  }
}
