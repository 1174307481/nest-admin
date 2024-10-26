import { Module } from '@nestjs/common'
import { CategoryModule } from '~/modules/appManage/category/category.module'
import { AppCategoryController } from './appCategory.controller'
import { AppCategoryService } from './appCategory.service'

@Module({
  imports: [CategoryModule],
  controllers: [AppCategoryController],
  providers: [AppCategoryService],
})
export class AppCategoryModule {}
