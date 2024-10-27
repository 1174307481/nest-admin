import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator'
import { IsBaseEnum } from './category.entity'

export class CategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '分类描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '分类头像ID', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  avatarId?: number

  @ApiProperty({ description: '排序编号', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderNo?: number

  @ApiProperty({
    description: '是否为基础分类',
    enum: IsBaseEnum,
    default: IsBaseEnum.NO,
  })
  @IsEnum(IsBaseEnum)
  @IsOptional()
  isBase?: IsBaseEnum
}

export class CategoryQueryDto {
  @ApiProperty({ description: '页码', required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number

  @ApiProperty({ description: '每页数量', required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize?: number

  @ApiProperty({ description: '分类名称', required: false })
  @IsString()
  @IsOptional()
  name?: string
}
