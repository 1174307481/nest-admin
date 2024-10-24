import { Body, Controller, Post } from '@nestjs/common'
import {
  Public,
} from '~/modules/auth/decorators/public.decorator'
import { AppAuthService } from './auth.service'

@Public()
@Controller('auth')
export class AppAuthController {
  constructor(private readonly authService: AppAuthService) {}

  @Post('wechat-login')
  async wechatLogin(@Body() body: { jsCode: string }) {
    return this.authService.wechatLogin(body.jsCode)
  }

  @Post('douyin-login')
  async douyinLogin(@Body() body: { jsCode: string }) {
    return this.authService.douyinLogin(body.jsCode)
  }
}
