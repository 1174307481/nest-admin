import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'

import { BannerModule } from './banner/banner.module'
import { CategoryModule } from './category/category.module'
import { FeedbackModule } from './feedback/feedback.module'
import { PictureModule } from './picture/picture.module'

const modules = [
  CategoryModule,
  PictureModule,
  BannerModule,
  FeedbackModule,

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
