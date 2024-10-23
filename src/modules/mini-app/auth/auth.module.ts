import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule as OuterAuthModule } from '~/modules/auth/auth.module'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service' // 导入外层的AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    OuterAuthModule, // 导入外层的AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
