import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import Redis from 'ioredis'

import { ApiResult } from '~/common/decorators/api-result.decorator'

import { InjectRedis } from '~/common/decorators/inject-redis.decorator'

import { Public } from '../decorators/public.decorator'

import { ImageCaptchaDto } from '../dto/captcha.dto'
import { ImageCaptcha } from '../models/auth.model'
import { CaptchaService } from '../services/captcha.service'

@ApiTags('Captcha - 验证码模块')
// @UseGuards(ThrottlerGuard)
@Controller('auth/captcha')
export class CaptchaController {
  constructor(@InjectRedis() private redis: Redis, private captchaService: CaptchaService,
  ) {}

  @Get('img')
  @ApiOperation({ summary: '获取登录图片验证码' })
  @ApiResult({ type: ImageCaptcha })
  @Public()
  // @Throttle({ default: { limit: 2, ttl: 600000 } })
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return this.captchaService.generateCaptcha(dto)
  }
}
