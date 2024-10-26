import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'

@Entity('app_feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @ManyToMany(() => Storage)
  @JoinTable()
  screenshots: Storage[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
