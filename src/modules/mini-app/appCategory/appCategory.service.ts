import { Injectable } from '@nestjs/common'
import { CategoryEntity } from '~/modules/appManage/category/category.entity'
import { CategoryService } from '~/modules/appManage/category/category.service'

@Injectable()
export class AppCategoryService {
  constructor(private readonly categoryService: CategoryService) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategoryTree()
  }

  async getSubCategories(parentId: number | null): Promise<CategoryEntity[]> {
    return this.categoryService.getSubCategories(parentId)
  }
}
