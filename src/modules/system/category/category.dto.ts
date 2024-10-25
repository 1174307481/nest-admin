import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator'

export class CategoryDto {
  @ApiProperty({ description: '分类名称' })
  @IsString()
  @MinLength(1)
  name: string

  @ApiProperty({ description: '分类描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '分类头像' })
  @IsString()
  avatar: string

  @ApiProperty({ description: '父级分类id', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  parentId?: number

  @ApiProperty({ description: '排序编号', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderNo?: number

  @ApiProperty({ description: '分类头像ID', required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  avatarId?: number
}
