import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'

import { Storage } from '~/modules/tools/storage/storage.entity'
import { CategoryDto } from './category.dto'
import { CategoryEntity } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: TreeRepository<CategoryEntity>,
    @InjectRepository(Storage)
    private readonly storageRepository: TreeRepository<Storage>,
  ) {}

  async list(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      relations: ['avatar'],
      order: { orderNo: 'DESC' },
    })
  }

  async getCategoryTree(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findTrees({
      relations: ['parent', 'avatar'],
    })
  }

  async create({ parentId, avatarId, ...data }: CategoryDto): Promise<void> {
    const parent = parentId ? await this.categoryRepository.findOne({ where: { id: parentId } }) : null
    const avatar = avatarId ? await this.storageRepository.findOne({ where: { id: avatarId } }) : null

    await this.categoryRepository.save({
      ...data,
      parent,
      avatar,
    })
  }

  async update(id: number, { parentId, avatarId, ...data }: CategoryDto): Promise<void> {
    const item = await this.categoryRepository.findOne({ where: { id }, relations: ['avatar'] })
    const parent = parentId ? await this.categoryRepository.findOne({ where: { id: parentId } }) : null
    const avatar = avatarId ? await this.storageRepository.findOne({ where: { id: avatarId } }) : item.avatar

    await this.categoryRepository.save({
      ...item,
      ...data,
      parent,
      avatar,
    })
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id)
  }

  async info(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'avatar'],
    })
    if (!category) {
      throw new Error('Category not found')
    }
    // 确保 orderNo 属性存在
    if (category.orderNo === undefined) {
      category.orderNo = 0 // 或者其他默认值
    }
    return category
  }

  async getSubCategories(parentId: number | null): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      where: { parent: parentId ? { id: parentId } : null },
      relations: ['avatar'],
      order: { orderNo: 'ASC' },
    })
  }
}
