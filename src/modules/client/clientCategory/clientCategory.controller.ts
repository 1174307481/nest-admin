import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IsBaseEnum } from '~/modules/appManage/category/category.entity'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { ClientCategoryService } from './clientCategory.service'

@ApiTags('小程序分类')
@Controller('clientCategory')
export class ClientCategoryController {
  constructor(private readonly clientCategoryService: ClientCategoryService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: '获取所有分类' })
  async getAllCategories(
    @Query('name') name?: string,
    @Query('isBase') isBase?: IsBaseEnum,
  ) {
    return this.clientCategoryService.getAllCategories(name, isBase)
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: '获取分类详情' })
  async getCategoryDetail(@Param('id') id: number) {
    return this.clientCategoryService.getCategoryDetail(id)
  }

  @Get('picture-categories/user/:userId')
  @Public()
  @ApiOperation({ summary: '获取用户图片中的所有分类' })
  async getUserPictureCategories(@Param('userId') userId: number) {
    return this.clientCategoryService.getUserPictureCategories(userId)
  }
}
