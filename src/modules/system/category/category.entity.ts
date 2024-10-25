import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'

@Entity({ name: 'sys_category' })
@Tree('materialized-path')
export class CategoryEntity extends CompleteEntity {
  @Column()
  @ApiProperty({ description: '分类名称' })
  name: string

  @Column({ nullable: true })
  @ApiProperty({ description: '分类描述', required: false })
  description?: string

  @Column({ nullable: true })
  @ApiProperty({ description: '分类头像' })
  avatar?: string

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '排序' })
  orderNo: number

  @TreeChildren({ cascade: true })
  children: CategoryEntity[]

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: CategoryEntity
}
