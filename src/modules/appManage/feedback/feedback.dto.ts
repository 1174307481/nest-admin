import { IsArray, IsNumber, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsArray()
  @IsNumber({}, { each: true })
  storageIds: number[]
}

export class UpdateFeedbackDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsArray()
  @IsNumber({}, { each: true })
  storageIds: number[]
}
