import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Picture } from '~/modules/tools/picture/picture.entity'
import { UserEntity } from '~/modules/user/user.entity' // 使用 Picture 实体

@Entity('user_favorites')
export class UserFavorite {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, user => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => Picture, picture => picture.favorites)
  @JoinColumn({ name: 'picture_id' })
  picture: Picture
}
