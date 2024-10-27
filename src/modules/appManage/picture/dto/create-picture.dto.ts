import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IsFile } from '~/modules/tools/upload/file.constraint'

export class CreatePictureDto {
  @ApiProperty({ type: 'string', format: 'binary', description: '文件' })
  @IsDefined()
  @IsFile(
    {
      mimetypes: [
        'image/png',
        'image/gif',
        'image/jpeg',
        'image/webp',
        'image/svg+xml',
      ],
      fileSize: 1024 * 1024 * 10,
    },
    {
      message: '文件类型不正确',
    },
  )
  file: File

  @ApiProperty({ description: '图片描述' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '分类IDs', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[]

  @ApiProperty({ description: '是否在首页显示', required: false })
  @IsBoolean()
  @IsOptional()
  isBase?: boolean
}
