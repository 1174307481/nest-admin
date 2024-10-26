import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateFeedbackDto } from '~/modules/appManage/feedback/feedback.dto'
import { AppFeedbackService } from './appFeedback.service'

@ApiTags('App Feedback')
@Controller('app-feedback')
export class AppFeedbackController {
  constructor(private readonly appFeedbackService: AppFeedbackService) {}

  @Post()
  @ApiOperation({ summary: '创建反馈' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.appFeedbackService.create(createFeedbackDto)
  }
}
