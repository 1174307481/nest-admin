import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { MinioModule } from '~/shared/minio/minio.module'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  imports: [TypeOrmModule.forFeature([Storage, UserEntity]), MinioModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
