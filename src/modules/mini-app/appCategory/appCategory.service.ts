import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CategoryEntity,
  IsBaseEnum,
} from '~/modules/appManage/category/category.entity'
import { CategoryService } from '~/modules/appManage/category/category.service'

@Injectable()
export class AppCategoryService {
  constructor(private readonly categoryService: CategoryService) {}

  async getAllCategories(
    name?: string,
    isBase?: IsBaseEnum,
  ): Promise<CategoryEntity[]> {
    return this.categoryService.list(name, IsBaseEnum.YES)
  }

  async getCategoryDetail(id: number) {
    const category = await this.categoryService.info(id)
    if (!category) {
      throw new NotFoundException('分类不存在')
    }
    return category
  }

  async getUserPictureCategories(userId: number): Promise<CategoryEntity[]> {
    return this.categoryService.getUserPictureCategories(userId)
  }
}
