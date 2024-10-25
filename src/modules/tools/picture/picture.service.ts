import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { CategoryEntity } from '../../system/category/category.entity'
import { Storage } from '../storage/storage.entity'
import { UploadService } from '../upload/upload.service'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { Picture } from './picture.entity' // 导入 CategoryEntity

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(CategoryEntity) // 注入 CategoryEntity 的 Repository
    private categoryRepository: Repository<CategoryEntity>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createPictureDto: CreatePictureDto, user: IAuthUser): Promise<Picture> {
    const file = await this.uploadService.saveFile(createPictureDto.file, user.uid)
    if (!file) {
      throw new Error('文件不存在')
    }

    const category = await this.categoryRepository.findOne({ where: { id: createPictureDto.categoryId } })
    if (!category) {
      throw new Error('分类不存在')
    }

    const picture = this.pictureRepository.create({
      category,
      description: createPictureDto.description,
      storage: file,
    })
    return await this.pictureRepository.save(picture)
  }

  async update(id: number, updatePictureDto: UpdatePictureDto): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({ where: { id } })
    if (!picture) {
      throw new Error('图片不存在')
    }

    if (updatePictureDto.fileId) {
      const storage = await this.storageRepository.findOne({ where: { id: updatePictureDto.fileId } })
      if (!storage) {
        throw new Error('文件不存在')
      }
      picture.storage = storage
    }

    if (updatePictureDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updatePictureDto.categoryId } })
      if (!category) {
        throw new Error('分类不存在')
      }
      picture.category = category
    }

    if (updatePictureDto.description) {
      picture.description = updatePictureDto.description
    }

    return await this.pictureRepository.save(picture)
  }

  async delete(ids: number[]): Promise<void> {
    await this.pictureRepository.delete(ids)
  }

  async findOne(id: number): Promise<Picture> {
    return this.pictureRepository.findOne({ where: { id } })
  }

  async list(pageDto: PicturePageDto): Promise<Pagination<Picture >> {
    const { page, pageSize, category, description, time } = pageDto

    const queryBuilder = this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoinAndSelect('picture.storage', 'storage')
      .leftJoinAndSelect('picture.category', 'category') // 加入分类关联
      .where({
        ...(category && { category: Like(`%${category}%`) }),
        ...(description && { description: Like(`%${description}%`) }),
      })

    const { items, ...rest } = await paginateRaw<Picture>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    // 将分类名称添加到每个图片对象中
    const itemsWithCategoryName = items

    return {
      items: itemsWithCategoryName,
      ...rest,
    }
  }

  async count(): Promise<number> {
    return this.pictureRepository.count()
  }
}
