import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IsBaseEnum } from '~/modules/appManage/category/category.entity'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { AppCategoryService } from './appCategory.service'

@ApiTags('小程序分类')
@Controller('app-category')
export class AppCategoryController {
  constructor(private readonly appCategoryService: AppCategoryService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: '获取所有分类' })
  async getAllCategories(
    @Query('name') name?: string,
    @Query('isBase') isBase?: IsBaseEnum,
  ) {
    return this.appCategoryService.getAllCategories(name, isBase)
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: '获取分类详情' })
  async getCategoryDetail(@Param('id') id: number) {
    return this.appCategoryService.getCategoryDetail(id)
  }

  @Get('user/:userId/picture-categories')
  @Public()
  @ApiOperation({ summary: '获取用户图片中的所有分类' })
  async getUserPictureCategories(@Param('userId') userId: number) {
    return this.appCategoryService.getUserPictureCategories(userId)
  }
}
