import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { Roles } from '~/modules/auth/auth.constant'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UploadService } from '~/modules/tools/upload/upload.service'
import { UserEntity } from '~/modules/user/user.entity'
import { CategoryEntity } from '../../appManage/category/category.entity'
import { PictureAuditService } from '../pictureAudit/pictureAudit.service'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { IsBaseEnum, Picture } from './picture.entity'

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => PictureAuditService))
    private readonly pictureAuditService: PictureAuditService,
  ) {}

  async create(
    createPictureDto: CreatePictureDto,
    user: IAuthUser,
  ): Promise<Picture> {
    const file = await this.uploadService.saveFile(
      createPictureDto.file as File,
      user.uid,
    )
    if (!file) {
      throw new Error('文件不存在')
    }

    // 判断有没有分类

    let categories = []
    if (createPictureDto.categoryIds) {
      categories = await this.categoryRepository.findBy({
        id: In(createPictureDto.categoryIds),
      })
      console.log('categories', categories)

      if (categories.length !== createPictureDto.categoryIds?.length) {
        throw new Error('部分分类不存在')
      }
    }

    const isAdmin = user.roles.includes(Roles.ADMIN)
    const auditStatus = isAdmin ? 1 : 0

    const picture = this.pictureRepository.create({
      name: file.name,
      description: createPictureDto.description,
      storage: file,
      categories,
      auditStatus,
      isBase: createPictureDto.isBase ? IsBaseEnum.YES : IsBaseEnum.NO,
      userId: user.uid, // 直接存储 userId
    })
    const savedPicture = await this.pictureRepository.save(picture)

    if (!isAdmin) {
      await this.pictureAuditService.create(savedPicture.id, user.uid)
    }

    return savedPicture
  }

  async update(
    id: number,
    updatePictureDto: UpdatePictureDto,
  ): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({
      where: { id },
      relations: ['categories', 'storage'], // 不再需要 'user' 关系
    })
    if (!picture) {
      throw new Error('图片不存在')
    }

    // 保存久storage
    const oldStorage: Storage = picture.storage
    if (updatePictureDto.storageId) {
      const storage = await this.storageRepository.findOne({
        where: { id: updatePictureDto.storageId },
      })
      if (!storage) {
        throw new Error('文件不存在')
      }
      picture.storage = storage
    }

    let categories = []
    if (updatePictureDto.categoryIds) {
      categories = await this.categoryRepository.findByIds(
        updatePictureDto.categoryIds,
      )
      if (categories.length !== updatePictureDto.categoryIds.length) {
        throw new Error('部分分类不存在')
      }
    }
    picture.categories = categories

    if (updatePictureDto.description !== undefined) {
      picture.description = updatePictureDto.description
    }

    if (updatePictureDto.isBase !== undefined) {
      picture.isBase = updatePictureDto.isBase ? IsBaseEnum.YES : IsBaseEnum.NO
    }

    const result = await this.pictureRepository.save(picture)
    if (oldStorage) {
      await this.storageRepository.delete(oldStorage.id)
    }
    return result
  }

  async delete(ids: number[], user: IAuthUser): Promise<void> {
    if (user.roles.includes(Roles.CREATOR)) {
      // 如果是 CREATOR，只能删除自己的图片
      const pictures = await this.pictureRepository
        .createQueryBuilder('picture')
        .leftJoinAndSelect('picture.storage', 'storage')
        .leftJoinAndSelect('storage.user', 'user')
        .where('picture.id IN (:...ids)', { ids })
        .andWhere('user.id = :userId', { userId: user.uid })
        .getMany()

      if (pictures.length !== ids.length) {
        throw new ForbiddenException('您没有权限删除不属于您的图片')
      }

      // 先删除相关的审核记录
      await this.pictureAuditService.deleteByPictureIds(
        pictures.map(p => p.id),
      )

      // 然后删除图片
      await this.pictureRepository.remove(pictures)
    }
    else {
      // 其他角色（如 ADMIN）可以删除任何图片
      // 先删除相关的审核记录
      await this.pictureAuditService.deleteByPictureIds(ids)

      // 然后删除图片
      await this.pictureRepository.delete(ids)
    }
  }

  async findOne(id: number): Promise<Picture> {
    return this.pictureRepository.findOne({ where: { id } })
  }

  async list(
    pageDto: PicturePageDto,
    user: IAuthUser,
    isApp: boolean = false,
  ): Promise<Pagination<Picture>> {
    const {
      page,
      pageSize,
      categoryIds,
      name,
      description,
      auditStatus,
      isBase,
    } = pageDto

    const queryBuilder = this.pictureRepository
      .createQueryBuilder('picture')
      .leftJoinAndSelect('picture.storage', 'storage')
      .leftJoinAndSelect('picture.categories', 'category')
      .select([
        'picture.id',
        'picture.name',
        'picture.description',
        'picture.auditStatus',
        'picture.createdAt',
        'picture.updatedAt',
        'picture.isBase',
        'picture.userId',
        'storage.id',
        'storage.name',
        'storage.path',
        'storage.type',
        'storage.size',
        'storage.extName',
        'storage.objectName',
        'category.id',
        'category.name',
      ])

    if (user?.roles?.includes(Roles.CREATOR) && !isApp) {
      queryBuilder.andWhere('picture.userId = :userId', { userId: user.uid })
    }

    if (categoryIds) {
      if (categoryIds.includes(0)) {
        // 如果包含0，需要查询没有分类的图片和指定分类的图片
        const nonZeroIds = categoryIds.filter(id => id !== 0)
        if (nonZeroIds.length > 0) {
          queryBuilder.andWhere(
            `(category.id IN (:...nonZeroIds) OR picture.id IN (
              SELECT DISTINCT p.id FROM app_picture p
              LEFT JOIN app_picture_categories_app_category pc ON p.id = pc.appPictureId
              WHERE pc.appCategoryId IS NULL
            ))`,
            { nonZeroIds },
          )
        }
        else {
          // 如果只有0，则只查询没有分类的图片
          queryBuilder.andWhere(
            `picture.id IN (
              SELECT DISTINCT p.id FROM app_picture p
              LEFT JOIN app_picture_categories_app_category pc ON p.id = pc.appPictureId
              WHERE pc.appCategoryId IS NULL
            )`,
          )
        }
      }
      else {
        // 原有逻辑：只查询指定分类的图片
        queryBuilder.andWhere('category.id IN (:...categoryIds)', {
          categoryIds,
        })
      }
    }

    if (name) {
      queryBuilder.andWhere('picture.name LIKE :name', { name: `%${name}%` })
    }

    if (description) {
      queryBuilder.andWhere('picture.description LIKE :description', {
        description: `%${description}%`,
      })
    }

    if (auditStatus !== undefined) {
      queryBuilder.andWhere('picture.auditStatus = :auditStatus', {
        auditStatus,
      })
    }

    if (isBase !== undefined) {
      queryBuilder.andWhere('picture.isBase = :isBase', { isBase })
    }

    const { items, ...rest } = await paginateRaw<Picture>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    const userIds = items.map((item: any) => item.picture_userId)
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
      relations: ['avatar'],
    })

    function formatResult(result: any[], users: UserEntity[]) {
      const pictureMap = new Map()
      const userMap = new Map(users.map(user => [user.id, user]))

      result.forEach((e) => {
        if (!pictureMap.has(e.picture_id)) {
          const user = userMap.get(e.picture_userId)
          pictureMap.set(e.picture_id, {
            id: e.picture_id,
            name: e.picture_name,
            description: e.picture_description,
            auditStatus: e.picture_auditStatus,
            isBase: Number(e.picture_isBase),
            createdAt: e.picture_createdAt,
            updatedAt: e.picture_updatedAt,
            storage: {
              id: e.storage_id,
              name: e.storage_name,
              path: e.storage_path,
              type: e.storage_type,
              size: e.storage_size,
              objectName: e.storage_objectName,
              extName: e.storage_ext_name,
            },
            user: {
              id: user?.id,
              username: user?.username,
              avatar: user?.avatar?.path,
            },
            categories: [],
            favoriteUsers: [],
          })
        }

        const picture = pictureMap.get(e.picture_id)
        if (
          e.category_id
          && !picture.categories.some(c => c.id === e.category_id)
        ) {
          picture.categories.push({
            id: e.category_id,
            name: e.category_name,
          })
        }
      })

      return Array.from(pictureMap.values())
    }

    return {
      items: formatResult(items, users) as any,
      ...rest,
    }
  }

  async count(): Promise<number> {
    return this.pictureRepository.count()
  }
}
