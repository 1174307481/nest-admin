import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { BannerQueryDto, CreateBannerDto, UpdateBannerDto } from './banner.dto'
import { BannerEntity } from './banner.entity'

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private bannerRepository: Repository<BannerEntity>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<BannerEntity> {
    const { coverId, ...bannerData } = createBannerDto
    const cover = await this.storageRepository.findOne({ where: { id: coverId } })
    if (!cover) {
      throw new Error('Cover image not found')
    }
    const banner = this.bannerRepository.create({
      ...bannerData,
      cover,
    })
    return this.bannerRepository.save(banner)
  }

  async findAll(query: BannerQueryDto): Promise<Pagination<BannerEntity>> {
    const queryBuilder = this.bannerRepository.createQueryBuilder('banner')
      .leftJoinAndSelect('banner.cover', 'cover')

    if (query.name) {
      queryBuilder.where('banner.name LIKE :name', { name: `%${query.name}%` })
    }

    return paginate(queryBuilder, { page: query.page, pageSize: query.pageSize })
  }

  async findOne(id: number): Promise<BannerEntity> {
    return this.bannerRepository.findOne({
      where: { id },
      relations: ['cover'],
    })
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<BannerEntity> {
    const { coverId, ...bannerData } = updateBannerDto
    const cover = await this.storageRepository.findOne({ where: { id: coverId } })
    if (!cover) {
      throw new Error('Cover image not found')
    }
    await this.bannerRepository.update(id, {
      ...bannerData,
      cover,
    })
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.bannerRepository.delete(id)
  }

  async getAllBanners(): Promise<BannerEntity[]> {
    return this.bannerRepository.find({ relations: ['cover'] })
  }
}
