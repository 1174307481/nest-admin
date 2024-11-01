import { Module } from '@nestjs/common'
import { UploadModule } from '~/modules/tools/upload/upload.module'
import { ClientCommonController } from './clientCommon.controller'

@Module({
  imports: [UploadModule],
  controllers: [ClientCommonController],
  providers: [],
  exports: [],
})
export class ClientCommonModule {}
