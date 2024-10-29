import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { Picture } from '../picture/picture.entity'

export enum IsBaseEnum {
  NO = 0,
  YES = 1,
}

@Entity({ name: 'app_category' })
export class CategoryEntity extends CompleteEntity {
  @Column()
  @ApiProperty({ description: '分类名称' })
  name: string

  @Column({ nullable: true })
  @ApiProperty({ description: '分类描述', required: false })
  description?: string

  @OneToOne(() => Storage)
  @JoinColumn()
  @ApiProperty({ description: '分类头像' })
  avatar?: Storage

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: '排序' })
  orderNo: number

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({
    description: '是否为首页展示',
    type: Number,
    default: 0,
  })
  isBase: number

  @ManyToMany(() => Picture, picture => picture.categories)
  pictures: Picture[]
}
