import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'
import { CreateBannerDto, UpdateBannerDto } from './banner.dto'
import { BannerEntity } from './banner.entity'
import { BannerService } from './banner.service'

export const permissions = definePermission('appManage:banner', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('AppManage - Banner模块')
@Controller('banner')
@UseGuards(RbacGuard)
@ApiSecurityAuth()
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @ApiOperation({ summary: '创建Banner' })
  @Perm(permissions.CREATE)
  create(@Body() createBannerDto: CreateBannerDto): Promise<BannerEntity> {
    return this.bannerService.create(createBannerDto)
  }

  @Get('list')
  @ApiOperation({ summary: '获取Banner列表（分页）' })
  @Perm(permissions.LIST)
  findAll(@Query() query: any): Promise<any> {
    return this.bannerService.findAll(query)
  }

  @Get('all')
  @ApiOperation({ summary: '获取所有Banner' })
  @Perm(permissions.LIST)
  getAllBanners(): Promise<BannerEntity[]> {
    return this.bannerService.getAllBanners()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Banner详情' })
  @Perm(permissions.READ)
  findOne(@Param('id') id: string): Promise<BannerEntity> {
    return this.bannerService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Banner' })
  @Perm(permissions.UPDATE)
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto): Promise<BannerEntity> {
    return this.bannerService.update(+id, updateBannerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Banner' })
  @Perm(permissions.DELETE)
  remove(@Param('id') id: string): Promise<void> {
    return this.bannerService.remove(+id)
  }
}
