import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { Picture } from '../picture/picture.entity'

@Entity({ name: 'app_picture_audit' })
export class PictureAuditEntity extends CommonEntity {
  @ManyToOne(() => Picture)
  @JoinColumn({ name: 'picture_id' })
  picture: Picture

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({ type: 'tinyint', default: 0, comment: '审核状态: 0-待审核, 1-通过, 2-驳回' })
  auditStatus: number

  @Column({ nullable: true, comment: '审核备注' })
  remark: string
}
