import { Injectable } from '@nestjs/common'
import { PicturePageDto } from '~/modules/appManage/picture/dto/picture-page.dto'
import { PictureService } from '~/modules/appManage/picture/picture.service'

@Injectable()
export class AppPictureService {
  constructor(private readonly pictureService: PictureService) {}

  async getPictures(pageDto: PicturePageDto) {
    return this.pictureService.list(pageDto)
  }

  async getPictureDetail(id: number) {
    return this.pictureService.findOne(id)
  }
}
