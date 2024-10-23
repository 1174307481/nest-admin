import { Controller } from '@nestjs/common'
import { AppUserService } from './user.service'

@Controller('app/user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  // 这里可以添加其他与用户相关的API接口
}
