import { Module } from '@nestjs/common'
import { BannerModule } from '~/modules/appManage/banner/banner.module'
import { ClientBannerController } from './clientBanner.controller'
import { ClientBannerService } from './clientBanner.service'

@Module({
  imports: [BannerModule],
  controllers: [ClientBannerController],
  providers: [ClientBannerService],
})
export class ClientBannerModule {}
