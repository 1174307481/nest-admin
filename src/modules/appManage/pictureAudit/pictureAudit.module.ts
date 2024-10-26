import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '~/modules/auth/auth.module'
import { Picture } from '../picture/picture.entity'
import { PictureModule } from '../picture/picture.module'
import { PictureAuditController } from './pictureAudit.controller'
import { PictureAuditEntity } from './pictureAudit.entity'
import { PictureAuditService } from './pictureAudit.service'

@Module({
  imports: [
    AuthModule,
    forwardRef(() => PictureModule),
    TypeOrmModule.forFeature([PictureAuditEntity, Picture]),
  ],
  controllers: [PictureAuditController],
  providers: [PictureAuditService],
  exports: [PictureAuditService],
})
export class PictureAuditModule {}
