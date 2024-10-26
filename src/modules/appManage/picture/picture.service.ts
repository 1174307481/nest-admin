import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Pagination } from '~/helper/paginate/pagination'
import { Roles } from '~/modules/auth/auth.constant'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UploadService } from '~/modules/tools/upload/upload.service'
import { CategoryEntity } from '../../appManage/category/category.entity'
import { PictureAuditService } from '../pictureAudit/pictureAudit.service'
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
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => PictureAuditService))
    private readonly pictureAuditService: PictureAuditService,
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

    const isAdmin = user.roles.includes(Roles.ADMIN)
    const auditStatus = isAdmin ? 1 : 0

    const picture = this.pictureRepository.create({
      name: file.name, // 使用上传文件的名称作为图片名称
      category,
      description: createPictureDto.description,
      storage: file,
      auditStatus,
    })
    const savedPicture = await this.pictureRepository.save(picture)

    if (!isAdmin) {
      await this.pictureAuditService.create(savedPicture.id, user.uid)
    }

    return savedPicture
  }

  async update(id: number, updatePictureDto: UpdatePictureDto): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({ where: { id } })
    if (!picture) {
      throw new Error('图片不存在')
    }
    Roles
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

  async delete(ids: number[], user: IAuthUser): Promise<void> {
    if (user.roles.includes(Roles.CREATOR)) {
      // 如果是 CREATOR，只能删除自己的图片
      const pictures = await this.pictureRepository
        .createQueryBuilder('picture')
        .leftJoinAndSelect('picture.storage', 'storage')
        .where('picture.id IN (:...ids)', { ids })
        .andWhere('storage.userId = :userId', { userId: user.uid })
        .getMany()

      if (pictures.length !== ids.length) {
        throw new ForbiddenException('您没有权限删除不属于您的图片')
      }

      await this.pictureRepository.remove(pictures)
    }
    else {
      // 其他角色（如 ADMIN）可以删除任何图片
      await this.pictureRepository.delete(ids)
    }
  }

  async findOne(id: number): Promise<Picture> {
    return this.pictureRepository.findOne({ where: { id } })
  }

  async list(pageDto: PicturePageDto, user: IAuthUser): Promise<Pagination<Picture>> {
    const { page, pageSize, categoryId, name, description } = pageDto

    const where: any = {}

    if (user.roles.includes(Roles.CREATOR)) {
      where['storage.userId'] = user.uid
    }

    if (categoryId) {
      where['category.id'] = categoryId
    }

    if (name) {
      where.name = Like(`%${name}%`)
    }

    if (description) {
      where.description = Like(`%${description}%`)
    }

    const [items, total] = await this.pictureRepository.findAndCount({
      where,
      relations: ['storage', 'category'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { id: 'DESC' }, // 你可以根据需要修改排序
    })

    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: pageSize,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
      },
    }
  }

  async count(): Promise<number> {
    return this.pictureRepository.count()
  }
}
