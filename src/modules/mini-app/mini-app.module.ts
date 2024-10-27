import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppAuthModule } from './appAuth/appAuth.module'
import { AppBannerModule } from './appBanner/appBanner.module'
import { AppCategoryModule } from './appCategory/appCategory.module'
import { AppCommonModule } from './appCommon/appCommon.module'
import { AppFeedbackModule } from './appFeedback/appFeedback.module'
import { AppPictureModule } from './appPicture/appPicture.module'
import { AppUserModule } from './appUser/appUser.module'
import { UserFavoriteModule } from './user-favorite/user-favorite.module'

const modules = [
  AppAuthModule,
  AppUserModule,
  UserFavoriteModule,
  AppPictureModule,
  AppCategoryModule,
  AppFeedbackModule,
  AppBannerModule,
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
    AppCommonModule,
  ],
  exports: [...modules],
})
export class MiniAppModule {}
