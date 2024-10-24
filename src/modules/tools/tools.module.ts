import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'

import { EmailModule } from './email/email.module'
import { PictureModule } from './picture/picture.module'
import { StorageModule } from './storage/storage.module'
import { UploadModule } from './upload/upload.module'

const modules = [StorageModule, EmailModule, UploadModule, PictureModule]

@Module({
  imports: [...modules, RouterModule.register([
    {
      path: 'tools',
      module: ToolsModule,
      children: [...modules],
    },
  ])],
  exports: [...modules],
})
export class ToolsModule {}
