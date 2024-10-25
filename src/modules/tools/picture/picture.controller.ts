import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { Permissions } from '~/modules/auth/decorators/permissions.decorator'
import { RbacGuard } from '~/modules/auth/guards/rbac.guard'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { PictureService } from './picture.service'

@ApiTags('Tools - 图片模块')
@Controller('picture')
@UseGuards(RbacGuard)
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('upload')
  @Permissions('picture:upload')
  @ApiOperation({ summary: '上传图片' })
  async create(@Body() createPictureDto: CreatePictureDto, @AuthUser() user: IAuthUser) {
    return this.pictureService.create(createPictureDto, user)
  }

  @Put(':id')
  @Permissions('picture:update')
  @ApiOperation({ summary: '更新图片' })
  async update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.update(+id, updatePictureDto)
  }

  @Delete(':ids')
  @Permissions('picture:delete')
  @ApiOperation({ summary: '删除图片' })
  async delete(@Param('ids') ids: string) {
    const pictureIds = ids.split(',').map(id => +id)
    return this.pictureService.delete(pictureIds)
  }

  @Get(':id')
  @Permissions('picture:read')
  @ApiOperation({ summary: '获取图片信息' })
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id)
  }

  @Get('list')
  @Permissions('picture:list')
  @ApiOperation({ summary: '获取图片列表' })
  async list(@Query() pageDto: PicturePageDto) {
    return this.pictureService.list(pageDto)
  }

  @Get('count')
  @Permissions('picture:count')
  @ApiOperation({ summary: '获取图片数量' })
  async count() {
    return this.pictureService.count()
  }
}
