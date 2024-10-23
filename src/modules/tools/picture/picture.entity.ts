import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Storage } from '../storage/storage.entity'

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'storage_id' })
  storage: Storage

  @Column()
  category: string

  @Column()
  description: string
}
