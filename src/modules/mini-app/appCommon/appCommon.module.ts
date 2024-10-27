import { Module } from '@nestjs/common'
import { UploadModule } from '~/modules/tools/upload/upload.module'
import { AppCommonController } from './appCommon.controller'

@Module({
  imports: [UploadModule],
  controllers: [AppCommonController],
  providers: [],
  exports: [],
})
export class AppCommonModule {}
