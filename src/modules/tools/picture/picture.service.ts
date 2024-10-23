import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Like, Repository } from 'typeorm'
import { paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { Storage } from '../storage/storage.entity'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { Picture } from './picture.entity'

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}

  async create(createPictureDto: CreatePictureDto): Promise<Picture> {
    const storage = await this.storageRepository.findOne({ where: { id: createPictureDto.fileId } })
    if (!storage) {
      throw new Error('文件不存在')
    }

    const picture = this.pictureRepository.create({
      category: createPictureDto.category,
      description: createPictureDto.description,
      storage,
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

    if (updatePictureDto.category) {
      picture.category = updatePictureDto.category
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

  async list(pageDto: PicturePageDto): Promise<Pagination<Picture>> {
    const { page, pageSize, category, description, time } = pageDto

    const queryBuilder = this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoinAndSelect('picture.storage', 'storage')
      .where({
        ...(category && { category: Like(`%${category}%`) }),
        ...(description && { description: Like(`%${description}%`) }),
        ...(time && { createdAt: Between(time[0], time[1]) }),
      })
      .orderBy('picture.createdAt', 'DESC')

    const { items, ...rest } = await paginateRaw<Picture>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    return {
      items,
      ...rest,
    }
  }

  async count(): Promise<number> {
    return this.pictureRepository.count()
  }
}
