import {
  BadRequestException,
  Controller,
  Post,
  Req,
} from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { FileUploadDto } from '~/modules/tools/upload/upload.dto'
import { UploadService } from '~/modules/tools/upload/upload.service'

@ApiSecurityAuth()
@ApiTags('Tools - 上传模块')
@Controller('app-common')
export class AppCommonController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: '上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async upload(@Req() req: FastifyRequest, @AuthUser() user: IAuthUser) {
    if (!req.isMultipart())
      throw new BadRequestException('Request is not multipart')

    const params: any = {}
    const formData = await req.formData()
    console.log('formData', formData)
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
      params[key] = value
    }

    try {
      const storage = await this.uploadService.saveFile(
        params.file as File,
        user.uid,
      )

      return storage
    }
    catch (error) {
      console.log(error)
      throw new BadRequestException('上传失败')
    }
  }
}
