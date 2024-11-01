import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { Picture } from '~/modules/appManage/picture/picture.entity'
import { UserEntity } from '~/modules/user/user.entity'

@Injectable()
export class UserFavoriteService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
  ) {}

  async addFavorite(userId: number, pictureId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoritePictures'],
    })
    const picture = await this.pictureRepository.findOne({
      where: { id: pictureId },
    })

    if (user && picture) {
      user.favoritePictures.push(picture)
      await this.userRepository.save(user)
    }
  }

  async removeFavorite(userId: number, pictureId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoritePictures'],
    })

    if (user) {
      user.favoritePictures = user.favoritePictures.filter(
        picture => picture.id !== pictureId,
      )
      await this.userRepository.save(user)
    }
  }

  async getUserFavorites(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Pagination<Picture>> {
    const queryBuilder = this.pictureRepository
      .createQueryBuilder('picture')
      .innerJoin('picture.favoriteUsers', 'user', 'user.id = :userId', {
        userId,
      })
      .orderBy('picture.id', 'DESC')

    return paginate(queryBuilder, { page, pageSize })
  }
}
