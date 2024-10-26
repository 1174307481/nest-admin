import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppAuthModule } from './appAuth/appAuth.module'
import { AppCategoryModule } from './appCategory/appCategory.module'
import { AppFeedbackModule } from './appFeedback/appFeedback.module'
import { AppPictureModule } from './appPicture/appPicture.module'
import { AppUserModule } from './appUser/appUser.module'
import { HomeModule } from './home/home.module'
import { UserFavoriteModule } from './user-favorite/user-favorite.module'

const modules = [
  AppAuthModule,
  AppUserModule,
  UserFavoriteModule,
  HomeModule,
  AppPictureModule,
  AppCategoryModule,
  AppFeedbackModule,
]

@Module({
  imports: [
    AppCategoryModule,
    ...modules,
    RouterModule.register([
      {
        path: 'mini-app',
        module: MiniAppModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class MiniAppModule {}
