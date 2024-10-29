import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'

@Entity('sys_banner')
export class BannerEntity extends CompleteEntity {
  @Column()
  @ApiProperty({ description: 'Banner 名称' })
  name: string

  @Column({ nullable: true })
  @ApiProperty({ description: 'Banner 描述' })
  description: string

  @Column()
  @ApiProperty({ description: 'Banner 链接' })
  link: string

  @OneToOne(() => Storage)
  @JoinColumn()
  @ApiProperty({ description: 'Banner 封面图片' })
  cover: Storage
}
