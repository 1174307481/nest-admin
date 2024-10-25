import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { Permissions } from '~/modules/auth/decorators/permissions.decorator'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'

import { CategoryDto } from './category.dto'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'

@ApiTags('System - 分类模块')
@Controller('categories')
@UseGuards(RbacGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取分类列表' })
  @Permissions('category:list') // 需要 category:list 权限
  async list(): Promise<CategoryEntity[]> {
    return this.categoryService.list()
  }

  @Post()
  @ApiOperation({ summary: '创建分类' })
  @Permissions('category:create') // 需要 category:create 权限
  async create(@Body() dto: CategoryDto): Promise<void> {
    await this.categoryService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @Permissions('category:update') // 需要 category:update 权限
  async update(@IdParam() id: number, @Body() dto: CategoryDto): Promise<void> {
    await this.categoryService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @Permissions('category:delete') // 需要 category:delete 权限
  async delete(@IdParam() id: number): Promise<void> {
    await this.categoryService.delete(id)
  }

  @Get('tree')
  @ApiOperation({ summary: '获取分类树' })
  @Permissions('category:tree') // 需要 category:tree 权限
  async getCategoryTree(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategoryTree()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取分类信息' })
  @Permissions('category:read') // 需要 category:read 权限
  async getCategoryInfo(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.info(id)
  }
}
