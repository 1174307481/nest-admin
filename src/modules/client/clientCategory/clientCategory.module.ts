import { Module } from '@nestjs/common'
import { CategoryModule } from '~/modules/appManage/category/category.module'
import { ClientCategoryController } from './clientCategory.controller'
import { ClientCategoryService } from './clientCategory.service'

@Module({
  imports: [CategoryModule],
  controllers: [ClientCategoryController],
  providers: [ClientCategoryService],
})
export class ClientCategoryModule {}
