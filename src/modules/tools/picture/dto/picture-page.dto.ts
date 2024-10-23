import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class PicturePageDto {
  @IsNumber()
  @Type(() => Number)
  page: number

  @IsNumber()
  @Type(() => Number)
  pageSize: number

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @IsDateString({}, { each: true })
  time?: [Date, Date]
}
