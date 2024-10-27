import { Module } from '@nestjs/common'
import { BannerModule } from '~/modules/appManage/banner/banner.module'
import { AppBannerController } from './appBanner.controller'
import { AppBannerService } from './appBanner.service'

@Module({
  imports: [BannerModule],
  controllers: [AppBannerController],
  providers: [AppBannerService],
})
export class AppBannerModule {}
