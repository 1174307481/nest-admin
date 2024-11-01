import { Module } from '@nestjs/common'
import { FeedbackModule } from '~/modules/appManage/feedback/feedback.module'
import { ClientFeedbackController } from './clientFeedback.controller'
import { ClientFeedbackService } from './clientFeedback.service'

@Module({
  imports: [FeedbackModule],
  controllers: [ClientFeedbackController],
  providers: [ClientFeedbackService],
  exports: [ClientFeedbackService],
})
export class ClientFeedbackModule {}
