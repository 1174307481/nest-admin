import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { CategoryEntity } from '../../appManage/category/category.entity'

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string // 添加 name 字段

  @ManyToOne(() => Storage)
  @JoinColumn()
  storage: Storage

  @ManyToOne(() => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity

  @Column({ nullable: true })
  description: string

  @Column({ type: 'tinyint', default: 0, comment: '审核状态: 0-待审核, 1-通过, 2-驳回' })
  auditStatus: number

  @ManyToMany(() => UserEntity, user => user.favoritePictures)
  favoriteUsers: UserEntity[]
}
