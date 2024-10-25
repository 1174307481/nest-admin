import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'

import { CategoryDto } from './category.dto'
import { CategoryEntity } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: TreeRepository<CategoryEntity>,
  ) {}

  async list(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ order: { orderNo: 'DESC' } })
  }

  async getCategoryTree(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findTrees({
      relations: ['parent'],
    })
  }

  async create({ parentId, ...data }: CategoryDto): Promise<void> {
    const parent = await this.categoryRepository
      .createQueryBuilder('category')
      .where({ id: parentId })
      .getOne()

    await this.categoryRepository.save({
      ...data,
      parent,
    })
  }

  async update(id: number, { parentId, ...data }: CategoryDto): Promise<void> {
    const item = await this.categoryRepository
      .createQueryBuilder('category')
      .where({ id })
      .getOne()

    const parent = await this.categoryRepository
      .createQueryBuilder('category')
      .where({ id: parentId })
      .getOne()

    await this.categoryRepository.save({
      ...item,
      ...data,
      parent,
    })
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id)
  }

  async info(id: number): Promise<CategoryEntity & { parentId: number }> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent'],
    })

    if (category) {
      return Object.assign({}, category, {
        parentId: category.parent ? category.parent.id : null,
      })
    }

    return null
  }
}
