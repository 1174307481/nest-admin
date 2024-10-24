import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { Perm } from '~/modules/auth/decorators/permission.decorator'
import { AuthUser } from '../../../modules/auth/decorators/auth-user.decorator'
import { permissions } from '../upload/upload.controller'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PicturePageDto } from './dto/picture-page.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { PictureService } from './picture.service'

@Controller('picture')
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
  ) {}

  @Post('upload')
  @Perm(permissions.UPLOAD)
  @ApiOperation({ summary: '上传图片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePictureDto,
  })
  async create(
    @Req() req: FastifyRequest,
    @AuthUser() user: IAuthUser,
  ) {
    if (!req.isMultipart())
      throw new BadRequestException('Request is not multipart')
    const file = await req.file()
    const query: any = await req.query // 获取其他的formData信息

    const params = {
      file,
      description: query.description as string,
      category: query.category as string,
    } as CreatePictureDto
    console.log(params)

    try {
      return await this.pictureService.create(params, user)
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

  @Get('list')
  async list(@Query() pageDto: PicturePageDto) {
    return await this.pictureService.list(pageDto)
  }

  @Get('count')
  async count() {
    return await this.pictureService.count()
  }
}
