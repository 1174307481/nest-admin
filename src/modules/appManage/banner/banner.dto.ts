import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateBannerDto {
  @ApiProperty({ description: 'Banner 名称' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Banner 描述', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: 'Banner 链接' })
  @IsUrl()
  link: string

  @ApiProperty({ description: 'Banner 封面图片ID' })
  @IsNumber()
  coverId: number
}

export class UpdateBannerDto extends CreateBannerDto {}

export class BannerQueryDto {
  page?: number
  pageSize?: number
  name?: string
}
