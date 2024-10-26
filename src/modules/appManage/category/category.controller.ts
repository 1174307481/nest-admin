import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'

import { CategoryDto } from './category.dto'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'

export const permissions = definePermission('appManage:category', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  TREE: 'tree',
} as const)

@ApiTags('System - 分类模块')
@Controller('categories')
@UseGuards(RbacGuard)
@ApiSecurityAuth()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取分类列表' })
  @Perm(permissions.LIST)
  async list(): Promise<CategoryEntity[]> {
    return this.categoryService.list()
  }

  @Post()
  @ApiOperation({ summary: '创建分类' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: CategoryDto): Promise<void> {
    await this.categoryService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: CategoryDto): Promise<void> {
    await this.categoryService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.categoryService.delete(id)
  }

  @Get('tree')
  @ApiOperation({ summary: '获取分类树' })
  @Perm(permissions.TREE)
  async getCategoryTree(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategoryTree()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取分类信息' })
  @Perm(permissions.READ)
  async getCategoryInfo(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.info(id)
  }
}
