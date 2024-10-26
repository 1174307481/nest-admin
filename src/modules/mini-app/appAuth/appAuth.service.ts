import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { firstValueFrom } from 'rxjs'
import { In, Repository } from 'typeorm'
import { TokenService } from '~/modules/auth/services/token.service'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { AppUserService } from '../appUser/appUser.service'

@Injectable()
export class AppAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DeptEntity)
    private deptRepository: Repository<DeptEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
    private readonly appUserService: AppUserService,
  ) {}

  async wechatLogin(jsCode: string): Promise<{ user: UserEntity, accessToken: string }> {
    const appId = 'wx3a939ab0dd34e12d'
    const appSecret = 'ccb3dd4d35ec078982c2001740fe3bb6'
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${jsCode}&grant_type=authorization_code`

    const response = await firstValueFrom(this.httpService.get(url))
    const { openid, session_key } = response.data
    console.log(response)

    let user = await this.userRepository.findOne({ where: { wechatOpenId: openid } })
    console.log('user', user)

    if (!user) {
      user = await this.appUserService.createUserWithWechatOpenId(openid)
      await this.userRepository.save(user)
    }

    const { accessToken } = await this.tokenService.generateAccessToken(user.id)
    return { user, accessToken }
  }

  async douyinLogin(jsCode: string): Promise<{ user: UserEntity, token: string }> {
    const appId = 'wx3a939ab0dd34e12d'
    const appSecret = 'ccb3dd4d35ec078982c2001740fe3bb6'
    const url = `https://open.douyin.com/oauth/access_token?client_key=${appId}&client_secret=${appSecret}&code=${jsCode}&grant_type=authorization_code`

    const response = await firstValueFrom(this.httpService.get(url))
    const { openid, access_token } = response.data

    let user = await this.userRepository.findOne({ where: { douyinOpenId: openid } })
    if (!user) {
      user = this.userRepository.create({
        douyinOpenId: openid,
        username: `douyin_${openid}`,
        password: 'hashed_password', // 使用适当的密码哈希
        dept: await this.deptRepository.findOne({ where: { id: 7 } }), // 关联部门实体
        roles: await this.roleRepository.findBy({ id: In([2]) }), // 关联角色实体
      })
      await this.userRepository.save(user)
    }

    const { accessToken } = await this.tokenService.generateAccessToken(user.id)
    return { user, token: accessToken }
  }
}
