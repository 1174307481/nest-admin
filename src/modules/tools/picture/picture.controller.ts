import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Perm } from '~/modules/auth/decorators/permission.decorator'
import { AuthUser } from '../../../modules/auth/decorators/auth-user.decorator'
import { permissions } from '../upload/upload.controller'
import { UploadService } from '../upload/upload.service'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { PictureService } from './picture.service'

@Controller('pictures')
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @Perm(permissions.UPLOAD)
  @ApiOperation({ summary: '保存图片信息' })
  async create(
    @AuthUser() user: IAuthUser,
    @Body() createPictureDto: CreatePictureDto,
  ) {
    try {
      return await this.pictureService.create(createPictureDto)
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('保存图片信息失败')
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return await this.pictureService.update(+id, updatePictureDto)
  }

  @Delete(':ids')
  async delete(@Param('ids') ids: string) {
    const pictureIds = ids.split(',').map(id => +id)
    await this.pictureService.delete(pictureIds)
    return { success: true }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pictureService.findOne(+id)
  }

  @Get()
  async list(@Query() pageDto: PicturePageDto) {
    return await this.pictureService.list(pageDto)
  }

  @Get('count')
  async count() {
    return await this.pictureService.count()
  }
}
