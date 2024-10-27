import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'
import { IsBaseEnum } from '../picture.entity'

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

  @ApiProperty({ description: '审核状态', required: false })
  @IsOptional()
  @IsNumber()
  auditStatus?: number

  @ApiProperty({ description: '是否首页展示', required: false })
  @IsOptional()
  @IsNumber()
  isBase?: IsBaseEnum
}

export class CreatePictureDto {
  @ApiProperty({ description: '图片名称' })
  @IsString()
  name: string

  @ApiProperty({ description: '存储ID' })
  @IsNumber()
  storageId: number

  @ApiProperty({ description: '分类IDs', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[]

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  description?: string
}
