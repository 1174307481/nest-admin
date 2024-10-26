import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Storage } from '~/modules/tools/storage/storage.entity'
import { FeedbackController } from './feedback.controller'
import { Feedback } from './feedback.entity'
import { FeedbackService } from './feedback.service'

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Storage])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
