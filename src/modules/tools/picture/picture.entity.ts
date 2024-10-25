import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserFavorite } from '~/modules/mini-app/user-favorite/user-favorite.entity'
import { CategoryEntity } from '../../system/category/category.entity'
import { Storage } from '../storage/storage.entity'

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'storage_id' })
  storage: Storage

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column()
  description: string

  @OneToMany(() => UserFavorite, userFavorite => userFavorite.picture)
  favorites: UserFavorite[]
}
