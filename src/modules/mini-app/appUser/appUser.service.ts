import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { generateShortUUID, md5 } from '~/utils'

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findByWechatOpenId(openid: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { wechatOpenId: openid } })
  }

  async findByDouyinOpenId(openid: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { douyinOpenId: openid } })
  }

  async createUserWithWechatOpenId(openid: string): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      wechatOpenId: openid,
      username: `wechat_${generateShortUUID()}`,
      password: md5(`${123456}`),
      roles: await this.roleRepository.findBy({ id: In([2]) }),
      dept: await DeptEntity.findOneBy({ id: 8 }),
    })
    return this.userRepository.save(newUser)
  }

  async createUserWithDouyinOpenId(openid: string): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      douyinOpenId: openid,
      username: `douyin_${openid}`,
      password: md5(`${123456}`),
      roles: await this.roleRepository.findBy({ id: In([2]) }),
      dept: await DeptEntity.findOneBy({ id: 8 }),
    })
    return this.userRepository.save(newUser)
  }

  async linkWechatOpenId(userId: number, openid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (user) {
      user.wechatOpenId = openid
      return this.userRepository.save(user)
    }
    throw new Error('User not found')
  }

  async linkDouyinOpenId(userId: number, openid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (user) {
      user.douyinOpenId = openid
      return this.userRepository.save(user)
    }
    throw new Error('User not found')
  }

  async getUserInfo(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'nickname', 'email', 'phone', 'avatar'], // 选择需要返回的字段
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async updateUserInfo(userId: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    // 只允许更新特定字段
    const allowedFields = ['nickname', 'email', 'phone', 'avatar']
    for (const field of allowedFields) {
      if (field in updateData) {
        user[field] = updateData[field]
      }
    }

    return this.userRepository.save(user)
  }
}
