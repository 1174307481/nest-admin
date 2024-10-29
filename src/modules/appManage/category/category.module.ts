import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '~/modules/auth/auth.module'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { StorageModule } from '~/modules/tools/storage/storage.module'
import { PictureModule } from '../picture/picture.module'
import { CategoryController } from './category.controller'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'

@Module({
  imports: [
    StorageModule,
    AuthModule,
    forwardRef(() => PictureModule), // 确保 PictureModule 被导入
    TypeOrmModule.forFeature([CategoryEntity, Storage]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
