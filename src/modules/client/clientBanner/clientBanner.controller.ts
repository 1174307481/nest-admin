import { Controller, Get, Query } from '@nestjs/common'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { ClientBannerService } from './clientBanner.service'

@Controller('clientBanner')
export class ClientBannerController {
  constructor(private readonly clientBannerService: ClientBannerService) {}

  @Get('findAll')
  @Public()
  async findAll(@Query() query: any) {
    return this.clientBannerService.findAll(query)
  }
}
