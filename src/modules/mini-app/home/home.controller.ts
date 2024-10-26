import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PicturePageDto } from '~/modules/appManage/picture/dto/picture-page.dto'
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { HomeService } from './home.service'

@ApiTags('Mini-App - Home')
@Controller('appHome')
@Public()

export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

  @Get('banners')
  @ApiOperation({ summary: '获取所有Banner' })
  @AllowAnon()
  async getAllBanners() {
    return this.homeService.getAllBanners()
  }

  @Get('pictures')
  @ApiOperation({ summary: '获取图片列表（分页）' })
  @AllowAnon()
  async getPictures(@Query() pageDto: PicturePageDto) {
    return this.homeService.getPictures(pageDto)
  }
}
