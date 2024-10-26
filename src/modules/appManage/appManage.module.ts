import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'

import { BannerModule } from './banner/banner.module'
import { CategoryModule } from './category/category.module'
import { CreatorAuditModule } from './creatorAudit/creatorAudit.module'
import { FeedbackModule } from './feedback/feedback.module'
import { PictureModule } from './picture/picture.module'
import { PictureAuditModule } from './pictureAudit/pictureAudit.module'

const modules = [
  CategoryModule,
  PictureModule,
  BannerModule,
  FeedbackModule,
  CreatorAuditModule,
  PictureAuditModule,
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'appManage',
        module: appManageModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class appManageModule {}
