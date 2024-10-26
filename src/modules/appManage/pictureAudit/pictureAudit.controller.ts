import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { BatchUpdatePictureAuditDto, PictureAuditQueryDto } from './pictureAudit.dto'
import { PictureAuditService } from './pictureAudit.service'

@ApiTags('图片审核')
@Controller('picture-audit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PictureAuditController {
  constructor(private readonly pictureAuditService: PictureAuditService) {}

  @Get()
  @ApiOperation({ summary: '获取图片审核列表' })
  async list(@Query() query: PictureAuditQueryDto) {
    return this.pictureAuditService.list(query)
  }

  @Put(':id')
  @ApiOperation({ summary: '审核图片' })
  async update(
    @Param('id') id: number,
    @Body() dto: { auditStatus: number, remark?: string },
  ) {
    return this.pictureAuditService.update(id, dto.auditStatus, dto.remark)
  }

  @Post('batch-update')
  @ApiOperation({ summary: '批量更新图片审核状态' })
  async batchUpdate(@Body() updateDto: BatchUpdatePictureAuditDto) {
    return this.pictureAuditService.batchUpdate(updateDto)
  }

  @Post('batch-audit')
  @ApiOperation({ summary: '批量审核图片' })
  async batchAudit(@Body() dto: BatchUpdatePictureAuditDto) {
    return this.pictureAuditService.batchAudit(dto)
  }
}
