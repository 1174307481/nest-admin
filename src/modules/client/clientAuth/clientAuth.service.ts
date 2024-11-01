import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from '~/modules/auth/auth.service'
import { TokenService } from '~/modules/auth/services/token.service'
import { DeptEntity } from '~/modules/system/dept/dept.entity'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { ClientUserService } from '../clientUser/clientUser.service'

@Injectable()
export class ClientAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DeptEntity)
    private deptRepository: Repository<DeptEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
    private readonly clientUserService: ClientUserService,
    private authService: AuthService,

  ) {}

  async login(
    username: string,
    password: string,
    ip: string,
    ua: string,
  ): Promise<string> {
    return this.authService.login(username, password, ip, ua)
  }
}
