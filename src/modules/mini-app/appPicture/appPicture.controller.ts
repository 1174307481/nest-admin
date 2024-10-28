import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PicturePageDto } from '~/modules/appManage/picture/dto/picture-page.dto'
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { AppPictureService } from './appPicture.service'

@ApiTags('Mini-App - Picture')
@Controller('appPicture')
@Public()
export class AppPictureController {
  constructor(private readonly appPictureService: AppPictureService) {}

  @Post('list')
  @ApiOperation({ summary: '获取图片列表（分页）' })
  @AllowAnon()
  async getPictures(
    @Body() pageDto: PicturePageDto,
    @AuthUser() user: IAuthUser,
  ) {
    return this.appPictureService.getPictures(pageDto, user)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个图片详情' })
  @AllowAnon()
  async getPictureDetail(@Param('id') id: number) {
    return this.appPictureService.getPictureDetail(id)
  }
}
