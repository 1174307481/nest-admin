import { ApiProperty } from '@nestjs/swagger'
import { Storage } from '~/modules/tools/storage/storage.entity'

export class AccountInfo {
  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '昵称' })
  nickname: string

  @ApiProperty({ description: '邮箱' })
  email: string

  @ApiProperty({ description: '手机号' })
  phone: string

  @ApiProperty({ description: '备注' })
  remark: string

  @ApiProperty({ description: '头像' })
  avatar: Storage
}
