import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

import { MenuEntity } from '~/modules/system/menu/menu.entity'

export class AccountUpdateDto {
  @ApiProperty({ description: '用户呢称' })
  @IsString()
  @IsOptional()
  nickname?: string

  @ApiProperty({ description: '用户邮箱' })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({ description: '用户QQ' })
  @IsString()
  @IsOptional()
  qq?: string

  @ApiProperty({ description: '用户手机号' })
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty({ description: '用户头像ID' })
  @IsOptional()
  avatarId?: number

  @ApiProperty({ description: '用户备注' })
  @IsString()
  @IsOptional()
  remark?: string
}

export class ResetPasswordDto {
  @ApiProperty({ description: '临时token', example: 'uuid' })
  @IsString()
  accessToken: string

  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  password: string
}

export class MenuMeta extends PartialType(OmitType(MenuEntity, ['parentId', 'createdAt', 'updatedAt', 'id', 'roles', 'path', 'name'] as const)) {
  title: string
}
export class AccountMenus extends PickType(MenuEntity, ['id', 'path', 'name', 'component'] as const) {
  meta: MenuMeta
}
