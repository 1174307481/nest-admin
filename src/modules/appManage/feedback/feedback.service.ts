import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { CreateFeedbackDto, UpdateFeedbackDto } from './feedback.dto'
import { Feedback } from './feedback.entity'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const { title, content, storageIds } = createFeedbackDto
    const screenshots = await this.storageRepository.findByIds(storageIds)

    const feedback = this.feedbackRepository.create({
      title,
      content,
      screenshots,
    })

    return this.feedbackRepository.save(feedback)
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['screenshots'] })
  }

  async findOne(id: number): Promise<Feedback> {
    return this.feedbackRepository.findOne({
      where: { id },
      relations: ['screenshots'],
    })
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOneBy({ id })
    const { title, content, storageIds } = updateFeedbackDto
    const screenshots = await this.storageRepository.findByIds(storageIds)

    feedback.title = title
    feedback.content = content
    feedback.screenshots = screenshots

    return this.feedbackRepository.save(feedback)
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id)
  }
}
