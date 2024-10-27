import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'
import { AccessTokenEntity } from '~/modules/auth/entities/access-token.entity'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { Picture } from '../appManage/picture/picture.entity'

@Entity({ name: 'sys_user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true, nullable: true })
  username: string

  @Exclude()
  @Column({ nullable: true })
  password: string

  @Column({ length: 32, nullable: true })
  psalt: string

  @Column({ nullable: true })
  nickname: string

  @OneToOne(() => Storage)
  @JoinColumn()
  avatar: Storage

  @Column({ nullable: true })
  qq: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number

  @Column({ unique: true, nullable: true })
  wechatOpenId: string

  @Column({ unique: true, nullable: true })
  douyinOpenId: string

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity[]>

  @ManyToOne(() => DeptEntity, dept => dept.users)
  @JoinColumn({ name: 'dept_id' })
  dept: Relation<DeptEntity>

  @OneToMany(() => AccessTokenEntity, accessToken => accessToken.user, {
    cascade: true,
  })
  accessTokens: Relation<AccessTokenEntity[]>

  @ManyToMany(() => Picture, picture => picture.favoriteUsers)
  @JoinTable({
    name: 'user_favorite_pictures',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'picture_id', referencedColumnName: 'id' },
  })
  favoritePictures: Relation<Picture[]>

  @OneToMany(() => Storage, storage => storage.user)
  storages: Relation<Storage[]>
}
