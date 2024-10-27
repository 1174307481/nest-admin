import { Controller, Get, Query } from '@nestjs/common'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { AppBannerService } from './appBanner.service'

@Controller('app-banner')
export class AppBannerController {
  constructor(private readonly appBannerService: AppBannerService) {}

  @Get('findAll')
  @Public()
  async findAll(@Query() query: any) {
    return this.appBannerService.findAll(query)
  }
}
