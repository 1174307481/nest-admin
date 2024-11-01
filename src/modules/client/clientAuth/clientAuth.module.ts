import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule as OuterAuthModule } from '~/modules/auth/auth.module'
import { DeptModule } from '~/modules/system/dept/dept.module'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { RoleModule } from '~/modules/system/role/role.module'
import { UserEntity } from '~/modules/user/user.entity' // 导入外层的AuthModule
import { ClientUserModule } from '../clientUser/clientUser.module'
import { ClientAuthController } from './clientAuth.controller'
import { ClientAuthService } from './clientAuth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    OuterAuthModule, // 导入外层的AuthModule
    DeptModule,
    RoleModule,
    ClientUserModule,
  ],
  controllers: [ClientAuthController],
  providers: [ClientAuthService],
  exports: [ClientAuthService],
})
export class ClientAuthModule {}
