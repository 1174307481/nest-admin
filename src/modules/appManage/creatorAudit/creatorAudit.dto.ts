import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { AuditStatus } from './creatorAudit.enum'

export class CreateCreatorAuditDto {
  @ApiProperty({ description: '用户ID' })
  userId: number

  @ApiProperty({ description: '申请理由' })
  @IsNotEmpty({ message: '申请理由不能为空' })
  @IsString()
  applyReason: string
}

export class UpdateCreatorAuditDto {
  @ApiProperty({ description: '审核状态', enum: AuditStatus })
  @IsNotEmpty({ message: '审核状态不能为空' })
  @IsEnum(AuditStatus)
  auditStatus: AuditStatus

  @ApiProperty({ description: '审核备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class CreatorAuditQueryDto {
  @ApiProperty({ description: '页码', required: false })
  @IsOptional()
  @IsNumber()
  page?: number

  @ApiProperty({ description: '每页数量', required: false })
  @IsOptional()
  @IsNumber()
  pageSize?: number

  @ApiProperty({ description: '审核状态', required: false, enum: AuditStatus })
  @IsOptional()
  @IsEnum(AuditStatus)
  auditStatus?: AuditStatus
}

export class BatchUpdateCreatorAuditDto {
  @ApiProperty({ description: '要批量更新的创作者审核ID列表' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[]

  @ApiProperty({ description: '审核状态', enum: AuditStatus })
  @IsEnum(AuditStatus)
  auditStatus: AuditStatus

  @ApiProperty({ description: '审核备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string
}
