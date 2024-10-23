import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdatePictureDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: '文件ID' })
  fileId?: number

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '分类' })
  category?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '描述' })
  description?: string
}
