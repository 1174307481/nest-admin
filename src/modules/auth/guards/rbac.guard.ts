import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '~/modules/auth/auth.service'
import { PERMISSION_KEY } from '~/modules/auth/decorators/permissions.decorator'

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredPermissions) {
      return true // 如果没有设置权限要求，则默认通过
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      return false // 如果没有用户信息，则拒绝访问
    }

    const userPermissions = await this.authService.getPermissions(user.id)

    // 检查用户是否具有所需的任何权限
    return requiredPermissions.some(permission => userPermissions.includes(permission))
  }
}
