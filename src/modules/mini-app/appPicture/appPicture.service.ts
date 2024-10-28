import { Injectable, NotFoundException } from '@nestjs/common'
import { AuditStatus } from '~/modules/appManage/creatorAudit/creatorAudit.enum'
import { PicturePageDto } from '~/modules/appManage/picture/dto/picture-page.dto'
import { PictureService } from '~/modules/appManage/picture/picture.service'

@Injectable()
export class AppPictureService {
  constructor(private readonly pictureService: PictureService) {}

  async getPictures(pageDto: PicturePageDto, user: IAuthUser) {
    pageDto = {
      ...pageDto,
      auditStatus: AuditStatus.APPROVED,
    }

    return this.pictureService.list(pageDto, user, true)
  }

  async getPictureDetail(id: number) {
    const picture = await this.pictureService.findOne(id)
    if (!picture) {
      throw new NotFoundException('图片不存在')
    }
    if (picture.auditStatus !== AuditStatus.APPROVED) {
      throw new NotFoundException('图片审核未通过')
    }
    return picture
  }
}
