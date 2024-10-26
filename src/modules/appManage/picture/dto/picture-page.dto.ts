import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PicturePageDto {
  @ApiProperty({ description: '页码', required: false })
  @IsOptional()
  @IsNumber()
  page?: number

  @ApiProperty({ description: '每页数量', required: false })
  @IsOptional()
  @IsNumber()
  pageSize?: number

  @ApiProperty({ description: '分类ID', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number

  @ApiProperty({ description: '名称', required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: '描述', required: false })
  @IsOptional()
  @IsString()
  description?: string
}
