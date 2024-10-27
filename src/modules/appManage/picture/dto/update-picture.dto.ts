import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdatePictureDto {
  @ApiProperty({ description: '存储ID', required: false })
  @IsNumber()
  @IsOptional()
  storageId?: number

  @ApiProperty({ description: '描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '分类ID列表', required: false, type: [Number] })
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[]

  @ApiProperty({ description: '是否在首页显示', required: false })
  @IsBoolean()
  @IsOptional()
  isBase?: boolean
}
