import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '~/modules/auth/auth.module'
import { StorageModule } from '~/modules/tools/storage/storage.module'
import { BannerController } from './banner.controller'
import { BannerEntity } from './banner.entity'
import { BannerService } from './banner.service'

@Module({
  imports: [
    AuthModule,
    StorageModule,
    TypeOrmModule.forFeature([BannerEntity]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [TypeOrmModule, BannerService],
})
export class BannerModule {}
