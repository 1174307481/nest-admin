import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { UserEntity } from '~/modules/user/user.entity'
import { Picture } from '../picture/picture.entity'
import {
  BatchUpdatePictureAuditDto,
  PictureAuditQueryDto,
} from './pictureAudit.dto'
import { PictureAuditEntity } from './pictureAudit.entity'

@Injectable()
export class PictureAuditService {
  constructor(
    @InjectRepository(PictureAuditEntity)
    private pictureAuditRepo: Repository<PictureAuditEntity>,
    @InjectRepository(Picture)
    private pictureRepo: Repository<Picture>,
  ) {}

  async create(pictureId: number, userId: number): Promise<PictureAuditEntity> {
    const picture = await this.pictureRepo.findOne({
      where: { id: pictureId },
    })
    if (!picture) {
      throw new Error('图片不存在')
    }

    const pictureAudit = this.pictureAuditRepo.create({
      picture,
      user: { id: userId } as UserEntity,
      auditStatus: 0,
    })

    return this.pictureAuditRepo.save(pictureAudit)
  }

  async update(
    id: number,
    auditStatus: number,
    remark?: string,
  ): Promise<PictureAuditEntity> {
    const pictureAudit = await this.pictureAuditRepo.findOne({
      where: { id },
      relations: ['picture'],
    })

    if (!pictureAudit) {
      throw new Error('审核记录不存在')
    }

    pictureAudit.auditStatus = auditStatus
    pictureAudit.remark = remark

    // 更新图片的审核状态
    pictureAudit.picture.auditStatus = auditStatus
    await this.pictureRepo.save(pictureAudit.picture)

    return this.pictureAuditRepo.save(pictureAudit)
  }

  async list(
    query: PictureAuditQueryDto,
  ): Promise<Pagination<PictureAuditEntity>> {
    const { page = 1, pageSize = 10, auditStatus } = query
    const queryBuilder = this.pictureAuditRepo
      .createQueryBuilder('pictureAudit')
      .leftJoinAndSelect('pictureAudit.picture', 'picture')
      .leftJoinAndSelect('picture.storage', 'storage')
      .leftJoinAndSelect('pictureAudit.user', 'user')
      .orderBy('pictureAudit.createdAt', 'DESC')

    if (auditStatus !== undefined) {
      queryBuilder.andWhere('pictureAudit.auditStatus = :auditStatus', {
        auditStatus,
      })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  async batchUpdate(updateDto: BatchUpdatePictureAuditDto): Promise<void> {
    const { ids, auditStatus, remark } = updateDto
    await this.pictureAuditRepo.update(
      { id: In(ids) },
      { auditStatus, remark },
    )
  }

  async batchAudit(dto: BatchUpdatePictureAuditDto) {
    const { ids, auditStatus, remark } = dto

    const pictureAudits = await this.pictureAuditRepo.find({
      where: { id: In(ids) },
    })

    if (pictureAudits.length !== ids.length) {
      throw new NotFoundException('部分图片审核记录不存在')
    }

    pictureAudits.forEach((audit) => {
      audit.auditStatus = auditStatus
      audit.remark = remark
    })

    await this.pictureAuditRepo.save(pictureAudits)

    return { message: '批量审核成功', updatedCount: pictureAudits.length }
  }

  async deleteByPictureIds(pictureIds: number[]): Promise<void> {
    await this.pictureAuditRepo
      .createQueryBuilder()
      .delete()
      .where('picture_id IN (:...pictureIds)', { pictureIds })
      .execute()
  }
}
