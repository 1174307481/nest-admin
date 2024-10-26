import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { CategoryEntity } from '../../appManage/category/category.entity'

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string // 添加 name 字段

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'storage_id' })
  storage: Storage

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column()
  description: string

  @ManyToMany(() => UserEntity, user => user.favoritePictures)
  favoriteUsers: UserEntity[]
}
