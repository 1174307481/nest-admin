import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Picture } from '~/modules/tools/picture/picture.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { UserFavorite } from './user-favorite.entity'

@Injectable()
export class UserFavoriteService {
  constructor(
    @InjectRepository(UserFavorite)
    private userFavoriteRepository: Repository<UserFavorite>,
  ) {}

  async addFavorite(userId: number, pictureId: number): Promise<void> {
    const userFavorite = this.userFavoriteRepository.create({
      user: { id: userId } as UserEntity,
      picture: { id: pictureId } as Picture,
    })
    await this.userFavoriteRepository.save(userFavorite)
  }

  async removeFavorite(userId: number, pictureId: number): Promise<void> {
    await this.userFavoriteRepository.delete({ user: { id: userId }, picture: { id: pictureId } })
  }

  async getUserFavorites(userId: number): Promise<UserFavorite[]> {
    return this.userFavoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['picture'],
    })
  }
}
