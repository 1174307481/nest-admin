import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard'
import { BatchUpdateCreatorAuditDto, CreateCreatorAuditDto, CreatorAuditQueryDto, UpdateCreatorAuditDto } from './creatorAudit.dto'
import { CreatorAuditEntity } from './creatorAudit.entity'
import { CreatorAuditService } from './creatorAudit.service' // 假设您有这个实体

@ApiTags('创作者审核')
@Controller('creator-audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CreatorAuditController {
  constructor(private readonly creatorAuditService: CreatorAuditService) {}

  @Post()
  @ApiOperation({ summary: '申请成为创作者' })
  async create(@AuthUser() user: IAuthUser, @Body() dto: CreateCreatorAuditDto) {
    return this.creatorAuditService.create({
      ...dto,
      userId: user.uid, // 假设 IAuthUser 中有 id 字段
    })
  }

  @Put(':id')
  @ApiOperation({ summary: '审核创作者申请' })
  async update(@Param('id') id: number, @Body() dto: UpdateCreatorAuditDto, @AuthUser() user: IAuthUser) {
    return this.creatorAuditService.update(id, dto, user)
  }

  @Get()
  @ApiOperation({ summary: '获取创作者审核列表' })
  @ApiResult({ type: [CreatorAuditEntity], isPage: true })
  async list(@Query() dto: CreatorAuditQueryDto): Promise<Pagination<CreatorAuditEntity>> {
    return this.creatorAuditService.page(dto)
  }

  @Post('batch-audit')
  @ApiOperation({ summary: '批量审核创作者申请' })
  async batchAudit(@Body() dto: BatchUpdateCreatorAuditDto) {
    return this.creatorAuditService.batchAudit(dto)
  }
}
