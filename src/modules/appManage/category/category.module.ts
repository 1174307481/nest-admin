import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '~/modules/auth/auth.module'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { StorageModule } from '~/modules/tools/storage/storage.module'
import { CategoryController } from './category.controller'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'

@Module({
  imports: [
    StorageModule,
    AuthModule,
    TypeOrmModule.forFeature([CategoryEntity, Storage]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
