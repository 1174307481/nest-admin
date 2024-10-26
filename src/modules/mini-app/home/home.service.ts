import { Injectable } from '@nestjs/common'
import { BannerService } from '~/modules/appManage/banner/banner.service'
import { PicturePageDto } from '~/modules/appManage/picture/dto/picture-page.dto'
import { PictureService } from '~/modules/appManage/picture/picture.service'

@Injectable()
export class HomeService {
  constructor(
    private readonly bannerService: BannerService,
    private readonly pictureService: PictureService,
  ) {}

  async getAllBanners() {
    return this.bannerService.getAllBanners()
  }

  async getPictures(pageDto: PicturePageDto, user: IAuthUser) {
    return this.pictureService.list(pageDto, user)
  }
}
