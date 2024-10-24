import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule as OuterAuthModule } from '~/modules/auth/auth.module'
import { DeptModule } from '~/modules/system/dept/dept.module'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { RoleModule } from '~/modules/system/role/role.module'
import { UserEntity } from '~/modules/user/user.entity' // 导入外层的AuthModule
import { AppUserModule } from '../user/user.module'
import { AppAuthController } from './auth.controller'
import { AppAuthService } from './auth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    OuterAuthModule, // 导入外层的AuthModule
    DeptModule,
    RoleModule,
    AppUserModule,
  ],
  controllers: [AppAuthController],
  providers: [AppAuthService],
  exports: [AppAuthService],
})
export class AppAuthModule {}
