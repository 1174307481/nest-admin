import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import {
  definePermission,
  Perm,
} from '~/modules/auth/decorators/permission.decorator'
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePictureDto,
  })
  async create(@Req() req: FastifyRequest, @AuthUser() user: IAuthUser) {
    if (!req.isMultipart())
      throw new BadRequestException('Request is not multipart')

    try {
      const params: any = {}
      const formData = await req.formData()
      // console.log("formData", formData);
      for (const [key, value] of formData.entries()) {
        // console.log(key, value);
        if (params[key]) {
          // 数组
          params[key] = [...params[key], value]
          if (key === 'categoryIds') {
            params[key] = params[key].map(n => +n)
          }
        }
        else {
          params[key] = value
        }
      }
      console.log('params', params)
      return await this.pictureService.create(params, user)
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('保存图片信息失败')
    }
  }

  @Put(':id')
  @Perm(permissions.UPDATE)
  @ApiOperation({ summary: '更新图片' })
  async update(
    @Param('id') id: string,
    @Body() updatePictureDto: UpdatePictureDto,
  ) {
    return this.pictureService.update(+id, updatePictureDto)
  }

  @Post('delete')
  @Perm(permissions.DELETE)
  @ApiOperation({ summary: '删除图片' })
  async delete(@Body() dto: { ids: number[] }, @AuthUser() user: IAuthUser) {
    return this.pictureService.delete(dto.ids, user)
  }

  @Get(':id')
  @Perm(permissions.READ)
  @ApiOperation({ summary: '获取图片信息' })
  async findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id)
  }

  @Post('list')
  @Perm(permissions.LIST)
  @ApiOperation({ summary: '获取图片列表（分页）' })
  async list(@Body() pageDto: PicturePageDto, @AuthUser() user: IAuthUser) {
    return this.pictureService.list(pageDto, user)
  }

  @Get('count')
  @Perm(permissions.COUNT)
  @ApiOperation({ summary: '获取图片数量' })
  async count() {
    return this.pictureService.count()
  }
}
