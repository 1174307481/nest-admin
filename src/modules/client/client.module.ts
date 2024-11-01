import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ClientAuthModule } from './clientAuth/clientAuth.module'
import { ClientBannerModule } from './clientBanner/clientBanner.module'
import { ClientCategoryModule } from './clientCategory/clientCategory.module'
import { ClientCommonModule } from './clientCommon/clientCommon.module'
import { ClientFeedbackModule } from './clientFeedback/clientFeedback.module'
import { ClientPictureModule } from './clientPicture/clientPicture.module'
import { ClientUserModule } from './clientUser/clientUser.module'
import { UserFavoriteModule } from './user-favorite/user-favorite.module'

const modules = [
  ClientAuthModule,
  ClientUserModule,
  UserFavoriteModule,
  ClientPictureModule,
  ClientCategoryModule,
  ClientFeedbackModule,
  ClientBannerModule,
  ClientCommonModule,
]

@Module({
  imports: [
    ClientCategoryModule,
    ...modules,
    RouterModule.register([
      {
        path: 'client',
        module: ClientModule,
        children: [...modules],
      },
    ]),
    ClientCommonModule,
  ],
  exports: [...modules],
})
export class ClientModule {}
