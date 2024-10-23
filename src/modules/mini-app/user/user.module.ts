import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { AppUserController } from './user.controller'
import { AppUserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
  ],
  controllers: [AppUserController],
  providers: [AppUserService],
  exports: [AppUserService], // 如果需要在其他模块中使用AppUserService，可以导出它
})
export class UserModule {}
