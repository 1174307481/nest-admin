import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { isEmpty } from 'lodash'
import * as svgCaptcha from 'svg-captcha'
import { InjectRedis } from '~/common/decorators/inject-redis.decorator'
import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { genCaptchaImgKey } from '~/helper/genRedisKey'
import { CaptchaLogService } from '~/modules/system/log/services/captcha-log.service'
import { generateUUID } from '~/utils'
import { ImageCaptchaDto } from '../dto/captcha.dto'
import { ImageCaptcha } from '../models/auth.model'

@Injectable()
export class CaptchaService {
  constructor(
    @InjectRedis() private redis: Redis,
    private captchaLogService: CaptchaLogService,
  ) {}

  async generateCaptcha(dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    const { width, height } = dto

    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(width) ? 100 : width,
      height: isEmpty(height) ? 50 : height,
      charPreset: '1234567890',
    })
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        'base64',
      )}`,
      id: generateUUID(),
    }
    // 5分钟过期时间
    await this.redis.set(genCaptchaImgKey(result.id), svg.text, 'EX', 60 * 5)
    return result
  }

  async checkImgCaptcha(id: string, code: string): Promise<void> {
    const result = await this.redis.get(genCaptchaImgKey(id))
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase())
      throw new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE)

    // 校验成功后移除验证码
    await this.redis.del(genCaptchaImgKey(id))
  }

  async log(
    account: string,
    code: string,
    provider: 'sms' | 'email',
    uid?: number,
  ): Promise<void> {
    await this.captchaLogService.create(account, code, provider, uid)
  }
}
