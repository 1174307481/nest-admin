import { Injectable } from '@nestjs/common'
import { CreateFeedbackDto } from '~/modules/appManage/feedback/feedback.dto'
import { FeedbackService } from '~/modules/appManage/feedback/feedback.service'

@Injectable()
export class AppFeedbackService {
  constructor(
    private readonly feedbackService: FeedbackService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto)
  }
}
