import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { paginate, paginateRaw } from '~/helper/paginate'
import { PaginationTypeEnum } from '~/helper/paginate/interface'
import { Pagination } from '~/helper/paginate/pagination'
import { RoleEntity } from '~/modules/system/role/role.entity'
import { UserEntity } from '~/modules/user/user.entity'
import { BatchUpdateCreatorAuditDto, CreateCreatorAuditDto, CreatorAuditQueryDto, UpdateCreatorAuditDto } from './creatorAudit.dto'
import { CreatorAuditEntity } from './creatorAudit.entity'
import { AuditStatus } from './creatorAudit.enum'

@Injectable()
export class CreatorAuditService {
  constructor(
    @InjectRepository(CreatorAuditEntity)
    private creatorAuditRepo: Repository<CreatorAuditEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,
  ) {}

  async page(dto: CreatorAuditQueryDto): Promise<Pagination<CreatorAuditEntity>> {
    const queryBuilder = this.creatorAuditRepo.createQueryBuilder('creatorAudit')
      .leftJoinAndSelect('creatorAudit.user', 'user')

    if (dto.auditStatus !== undefined) {
      queryBuilder.andWhere('creatorAudit.auditStatus = :auditStatus', { auditStatus: dto.auditStatus })
    }

    return paginate(queryBuilder, { page: dto.page, pageSize: dto.pageSize })
  }

  async create(dto: CreateCreatorAuditDto): Promise<CreatorAuditEntity> {
    const user = await this.userRepo.findOneBy({ id: dto.userId })
    if (!user) {
      throw new Error('用户不存在')
    }

    const creatorAudit = this.creatorAuditRepo.create({
      user,
      applyReason: dto.applyReason,
    })

    return this.creatorAuditRepo.save(creatorAudit)
  }

  async update(id: number, dto: UpdateCreatorAuditDto, currentUser: IAuthUser): Promise<CreatorAuditEntity> {
    const creatorAudit = await this.creatorAuditRepo.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!creatorAudit) {
      throw new NotFoundException('审核记录不存在')
    }

    creatorAudit.auditStatus = dto.auditStatus
    creatorAudit.remark = dto.remark

    if (dto.auditStatus === AuditStatus.APPROVED) {
      // 审核通过，添加创作者角色
      const creatorRole = await this.roleRepo.findOneBy({ id: 11 })
      if (!creatorRole) {
        throw new Error('创作者角色不存在')
      }

      const user = await this.userRepo.findOne({
        where: { id: currentUser.uid },
        relations: ['roles'],
      })

      if (!user) {
        throw new NotFoundException('用户不存在')
      }

      user.roles = [...(user.roles || []), creatorRole]
      await this.userRepo.save(user)
    }

    return this.creatorAuditRepo.save(creatorAudit)
  }

  async list(page: number, pageSize: number, auditStatus?: number): Promise<Pagination<CreatorAuditEntity>> {
    const queryBuilder = this.creatorAuditRepo
      .createQueryBuilder('creatorAudit')
      .leftJoinAndSelect('creatorAudit.user', 'user')
      .orderBy('creatorAudit.createdAt', 'DESC')

    if (auditStatus !== undefined) {
      queryBuilder.andWhere('creatorAudit.auditStatus = :auditStatus', { auditStatus })
    }

    const { items, ...rest } = await paginateRaw<CreatorAuditEntity>(queryBuilder, {
      page,
      pageSize,
      paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
    })

    return {
      items,
      ...rest,
    }
  }

  async batchAudit(dto: BatchUpdateCreatorAuditDto) {
    const { ids, auditStatus, remark } = dto

    const creatorAudits = await this.creatorAuditRepo.find({
      where: { id: In(ids) },
      relations: ['user'],
    })

    if (creatorAudits.length !== ids.length) {
      throw new NotFoundException('部分创作者审核记录不存在')
    }

    const creatorRole = await this.roleRepo.findOneBy({ id: 11 })
    if (!creatorRole) {
      throw new Error('创作者角色不存在')
    }

    for (const audit of creatorAudits) {
      audit.auditStatus = auditStatus
      audit.remark = remark

      if (auditStatus === AuditStatus.APPROVED) {
        const user = await this.userRepo.findOne({
          where: { id: audit.user.id },
          relations: ['roles'],
        })

        if (user) {
          user.roles = [...(user.roles || []), creatorRole]
          await this.userRepo.save(user)
        }
      }
    }

    await this.creatorAuditRepo.save(creatorAudits)

    return { message: '批量审核成功', updatedCount: creatorAudits.length }
  }

  // 其他方法如获取列表、获取详情等...
}
