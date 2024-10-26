import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator'
import { Public } from '~/modules/auth/decorators/public.decorator'
import { AppCategoryService } from './appCategory.service'

@ApiTags('Mini-App - Category')
@Controller('appCategories')
@Public()

export class AppCategoryController {
  constructor(private readonly appCategoryService: AppCategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  @AllowAnon()
  async getAllCategories() {
    return this.appCategoryService.getAllCategories()
  }

  @Get('sub')
  @ApiOperation({ summary: '获取子分类列表' })
  @AllowAnon()
  async getSubCategories(@Query('parentId') parentId: number | null) {
    return this.appCategoryService.getSubCategories(parentId)
  }
}
