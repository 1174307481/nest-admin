import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { AuditStatus } from './creatorAudit.enum'

@Entity({ name: 'app_creator_audit' })
export class CreatorAuditEntity extends CommonEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({ type: 'tinyint', default: AuditStatus.PENDING, comment: '审核状态: 0-待审核, 1-通过, 2-驳回' })
  auditStatus: AuditStatus

  @Column({ nullable: true, comment: '审核备注' })
  remark: string

  @Column({ nullable: true, comment: '申请理由' })
  applyReason: string
}
