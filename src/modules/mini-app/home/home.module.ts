import { Module } from '@nestjs/common'
import { BannerModule } from '~/modules/appManage/banner/banner.module'
import { PictureModule } from '~/modules/appManage/picture/picture.module'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

@Module({
  imports: [BannerModule, PictureModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
