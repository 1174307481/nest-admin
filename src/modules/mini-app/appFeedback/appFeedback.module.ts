import { Module } from '@nestjs/common'
import { FeedbackModule } from '~/modules/appManage/feedback/feedback.module'
import { AppFeedbackController } from './appFeedback.controller'
import { AppFeedbackService } from './appFeedback.service'

@Module({
  imports: [FeedbackModule],
  controllers: [AppFeedbackController],
  providers: [AppFeedbackService],
  exports: [AppFeedbackService],
})
export class AppFeedbackModule {}
