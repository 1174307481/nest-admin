import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { AuthModule } from './auth/auth.module'
import { AppUserController } from './user/user.controller'
import { UserModule } from './user/user.module'
import { AppUserService } from './user/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppUserController],
  providers: [AppUserService],
})
export class MiniAppModule {}
