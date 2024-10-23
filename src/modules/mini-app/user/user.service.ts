import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { md5, randomValue } from '~/utils'

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
      username: `wechat_${openid}`,
      password: md5(`${randomValue(32)}`),
      roles: await this.roleRepository.findBy({ id: In([2]) }),
      dept: await DeptEntity.findOneBy({ id: 8 }),
    })
    return this.userRepository.save(newUser)
  }

  async createUserWithDouyinOpenId(openid: string): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      douyinOpenId: openid,
      username: `douyin_${openid}`,
      password: md5(`${randomValue(32)}`),
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
}
