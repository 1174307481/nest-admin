import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '~/modules/auth/auth.module'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { CreatorAuditController } from './creatorAudit.controller'
import { CreatorAuditEntity } from './creatorAudit.entity'
import { CreatorAuditService } from './creatorAudit.service'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CreatorAuditEntity, UserEntity, RoleEntity]),
  ],
  controllers: [CreatorAuditController],
  providers: [CreatorAuditService],
})
export class CreatorAuditModule {}
