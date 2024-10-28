import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { CategoryEntity } from '../../appManage/category/category.entity'

export enum IsBaseEnum {
  NO = 0,
  YES = 1,
}
@Entity('app_picture')
export class Picture extends CommonEntity {
  @Column()
  name: string

  @ManyToOne(() => Storage)
  @JoinColumn()
  storage: Storage

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[]

  @Column({ nullable: true })
  description: string

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '审核状态: 0-待审核, 1-通过, 2-驳回',
  })
  auditStatus: number

  @ManyToMany(() => UserEntity, user => user.favoritePictures)
  favoriteUsers: UserEntity[]

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({
    description: '是否为首页展示',
    type: Number,
    default: 0,
  })
  isBase: number

  @Column()
  userId: number
  // 如果 CommonEntity 中没有定义这些字段，可以在这里添加
  // @CreateDateColumn()
  // createdAt: Date

  // @UpdateDateColumn()
  // updatedAt: Date
}
