import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePictureDto {
  @IsNumber()
  @IsNotEmpty()
  fileId: number

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  description: string
}
