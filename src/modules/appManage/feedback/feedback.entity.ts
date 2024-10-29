import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'

@Entity('app_feedback')
export class Feedback extends CompleteEntity {
  @Column()
  title: string

  @Column('text')
  content: string

  @ManyToMany(() => Storage)
  @JoinTable()
  screenshots: Storage[]
}
