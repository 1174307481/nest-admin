import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Like, Repository } from 'typeorm'

import { paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { MinioService } from '~/shared/minio/minio.service'

import { deleteFile } from '~/utils'
import { StorageCreateDto, StoragePageDto } from './storage.dto'
import { StorageInfo } from './storage.modal'

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly minioService: MinioService,
  ) {}

  async create(dto: StorageCreateDto, userId: number): Promise<Storage> {
    // 查找用户
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new Error('用户不存在')
    }

    // 创建并保存存储记录
    const storage = this.storageRepository.create({
      ...dto,
      user, // 使用完整的用户对象
    })

    return await this.storageRepository.save(storage)
  }

  /**
   * 删除文件
   */
  async delete(fileIds: number[]): Promise<void> {
    const items = await this.storageRepository.findByIds(fileIds)
    await this.storageRepository.delete(fileIds)

    for (const item of items) {
      // 删除本地文件
      deleteFile(item.path)

      // 删除MinIO中的文件
      const bucketName = 'wallpaper' // 假设所有文件都在同一个bucket中
      const objectName = item.objectName // 使用objectName来删除文件
      if (objectName) {
        await this.minioService.deleteImage(bucketName, objectName)
      }
    }
  }

  async list({
    page,
    pageSize,
    name,
    type,
    size,
    extName,
    time,
    username,
  }: StoragePageDto): Promise<Pagination<StorageInfo>> {
    const queryBuilder = this.storageRepository
      .createQueryBuilder('storage')
      .leftJoinAndSelect('storage.user', 'user')
      .select([
        'storage.id',
        'storage.name',
        'storage.extName',
        'storage.path',
        'storage.type',
        'storage.size',
        'storage.createdAt',
        'storage.objectName',
        'user.id',
        'user.username',
        'user.avatar',
      ])
      .where({
        ...(name && { name: Like(`%${name}%`) }),
        ...(type && { type }),
        ...(extName && { extName }),
        ...(size && { size: Between(size[0], size[1]) }),
        ...(time && { createdAt: Between(time[0], time[1]) }),
      })
      .orderBy('storage.createdAt', 'DESC')

    if (username) {
      queryBuilder.andWhere('user.username = :username', { username })
    }

    const { items, ...rest } = await paginateRaw<Storage>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    function formatResult(result: Storage[]) {
      return result.map((e: any) => {
        return {
          id: e.storage_id,
          name: e.storage_name,
          extName: e.storage_ext_name,
          path: e.storage_path,
          type: e.storage_type,
          size: e.storage_size,
          createdAt: e.storage_created_at,
          objectName: e.storage_object_name,
          user: {
            id: e.user_id,
            username: e.user_username,
            avatar: e.user_avatar,
          },
        }
      })
    }

    return {
      items: formatResult(items),
      ...rest,
    }
  }

  async count(): Promise<number> {
    return this.storageRepository.count()
  }
}
