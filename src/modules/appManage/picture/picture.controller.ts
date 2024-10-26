import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { PictureService } from './picture.service'

export const permissions = definePermission('appManage:picture', {
  UPLOAD: 'upload',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
  LIST: 'list',
  COUNT: 'count',
} as const)

@ApiTags('Tools - 图片模块')
@Controller('picture')
@UseGuards(RbacGuard)
@ApiSecurityAuth()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('upload')
  @Perm(permissions.UPLOAD)
  @ApiOperation({ summary: '上传图片' })
  async create(@Body() createPictureDto: CreatePictureDto, @AuthUser() user: IAuthUser) {
    return this.pictureService.create(createPictureDto, user)
  }

  @Put(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({ summary: '更新图片' })
  async update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.update(+id, updatePictureDto)
  }

  @Delete(':ids')
  @Perm(permissions.DELETE)
  @ApiOperation({ summary: '删除图片' })
  async delete(@Param('ids') ids: string) {
    const pictureIds = ids.split(',').map(id => +id)
    return this.pictureService.delete(pictureIds)
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({ summary: '获取图片信息' })
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id)
  }

  @Get('list')
  @Perm(permissions.LIST)
  @ApiOperation({ summary: '获取图片列表（分页）' })
  async list(@Query() pageDto: PicturePageDto) {
    return this.pictureService.list(pageDto)
  }

  @Get('count')
  @Perm(permissions.COUNT)
  @ApiOperation({ summary: '获取图片数量' })
  async count() {
    return this.pictureService.count()
  }
}
