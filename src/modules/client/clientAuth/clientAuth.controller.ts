import { Body, Controller, Get, Headers, Ip, Post, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import {
  Public,
} from '~/modules/auth/decorators/public.decorator'
import { LoginDto } from '~/modules/auth/dto/auth.dto'
import { ImageCaptchaDto } from '~/modules/auth/dto/captcha.dto'
import { ImageCaptcha, LoginToken } from '~/modules/auth/models/auth.model'
import { CaptchaService } from '~/modules/auth/services/captcha.service'
import { ClientAuthService } from './clientAuth.service'

@Public()
@Controller('clientAuth')
export class ClientAuthController {
  constructor(
    private readonly authService: ClientAuthService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult({ type: LoginToken })
  async login(@Body() dto: LoginDto, @Ip() ip: string, @Headers('user-agent') ua: string): Promise<LoginToken> {
    await this.captchaService.checkImgCaptcha(dto.captchaId, dto.verifyCode)
    const token = await this.authService.login(
      dto.username,
      dto.password,
      ip,
      ua,
    )
    return { token }
  }

  @Get('captcha')
  @ApiOperation({ summary: '获取验证码' })
  @ApiResult({ type: ImageCaptcha })
  @Public()
  async getCaptcha(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return this.captchaService.generateCaptcha(dto)
  }
}
