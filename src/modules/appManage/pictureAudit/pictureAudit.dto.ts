import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class PictureAuditQueryDto {
  @ApiPropertyOptional({ description: '页码' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number

  @ApiPropertyOptional({ description: '每页数量' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pageSize?: number

  @ApiPropertyOptional({ description: '审核状态' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  auditStatus?: number
}

export class BatchUpdatePictureAuditDto {
  @ApiProperty({ description: '图片审核ID数组' })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[]

  @ApiProperty({ description: '审核状态', enum: [0, 1, 2] })
  @IsEnum([0, 1, 2])
  auditStatus: number

  @ApiProperty({ description: '审核备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string
}
