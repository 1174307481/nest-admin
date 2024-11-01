import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '~/modules/auth/auth.module'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { ClientUserController } from './clientUser.controller'
import { ClientUserService } from './clientUser.service'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [ClientUserController],
  providers: [ClientUserService],
  exports: [ClientUserService], // 如果需要在其他模块中使用ClientUserService，可以导出它
})
export class ClientUserModule {}
