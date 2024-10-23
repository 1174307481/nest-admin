import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wechat-login')
  async wechatLogin(@Body() body: { jsCode: string }) {
    return this.authService.wechatLogin(body.jsCode)
  }

  @Post('douyin-login')
  async douyinLogin(@Body() body: { jsCode: string }) {
    return this.authService.douyinLogin(body.jsCode)
  }
}
