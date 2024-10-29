import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { Picture } from '../picture/picture.entity'
import { CategoryDto, CategoryQueryDto } from './category.dto'
import { CategoryEntity, IsBaseEnum } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    protected readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  protected getCategoryRepository(): Repository<CategoryEntity> {
    return this.categoryRepository
  }

  async page({
    page,
    pageSize,
    name,
  }: CategoryQueryDto): Promise<Pagination<CategoryEntity>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.avatar', 'avatar')

    if (name) {
      queryBuilder.where('category.name LIKE :name', {
        name: `%${name}%`,
      })
    }

    queryBuilder.orderBy('category.orderNo', 'ASC')

    return paginate(queryBuilder, { page, pageSize })
  }

  async create({
    avatarId,
    isBase = IsBaseEnum.NO,
    ...data
  }: CategoryDto): Promise<void> {
    const avatar = avatarId
      ? await this.storageRepository.findOne({ where: { id: avatarId } })
      : null

    await this.categoryRepository.save({
      ...data,
      avatar,
      isBase,
    })
  }

  async update(
    id: number,
    { avatarId, isBase, ...data }: CategoryDto,
  ): Promise<void> {
    const item = await this.categoryRepository.findOne({
      where: { id },
      relations: ['avatar'],
    })
    const avatar = avatarId
      ? await this.storageRepository.findOne({ where: { id: avatarId } })
      : item.avatar

    await this.categoryRepository.save({
      ...item,
      ...data,
      avatar,
      isBase: isBase !== undefined ? isBase : item.isBase,
    })
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id)
  }

  async info(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['avatar'],
    })
    if (!category) {
      throw new Error('分类不存在')
    }
    return category
  }

  async list(name?: string, isBase?: IsBaseEnum): Promise<CategoryEntity[]> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.avatar', 'avatar')
      .orderBy('category.orderNo', 'ASC')

    if (name) {
      queryBuilder.andWhere('category.name LIKE :name', { name: `%${name}%` })
    }

    if (isBase !== undefined) {
      queryBuilder.andWhere('category.isBase = :isBase', { isBase })
    }

    return queryBuilder.getMany()
  }

  async getUserPictureCategories(userId: number): Promise<CategoryEntity[]> {
    // 使用子查询找出用户的图片所关联的分类
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.avatar', 'avatar')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('pc.appCategoryId')
          .from('app_picture_categories_app_category', 'pc')
          .innerJoin('app_picture', 'p', 'p.id = pc.appPictureId')
          .where('p.userId = :userId')
          .getQuery()
        return `category.id IN ${subQuery}`
      })
      .setParameter('userId', userId)
      .orderBy('category.orderNo', 'ASC')
      .getMany()

    // 创建未分类选项
    const uncategorized = new CategoryEntity()
    uncategorized.id = 0
    uncategorized.name = '未分类'
    uncategorized.orderNo = -1

    return [uncategorized, ...categories]
  }
}
