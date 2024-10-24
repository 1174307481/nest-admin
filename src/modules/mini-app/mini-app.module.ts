import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppAuthModule } from './auth/auth.module'
import { AppUserModule } from './user/user.module'

const modules = [AppAuthModule, AppUserModule]

@Module({
  imports: [...modules, RouterModule.register([
    {
      path: 'mini-app',
      module: MiniAppModule,
      children: [...modules],
    },
  ])],
  exports: [...modules],
})
export class MiniAppModule {}
