import { Injectable } from '@nestjs/common'
import { BannerService } from '~/modules/appManage/banner/banner.service'

@Injectable()
export class AppBannerService {
  constructor(private readonly bannerService: BannerService) {}

  async findAll(query: any) {
    return await this.bannerService.getAllBanners()
  }
}
