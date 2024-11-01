import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateFeedbackDto } from '~/modules/appManage/feedback/feedback.dto'
import { ClientFeedbackService } from './clientFeedback.service'

@ApiTags('App Feedback')
@Controller('clientFeedback')
export class ClientFeedbackController {
  constructor(private readonly clientFeedbackService: ClientFeedbackService) {}

  @Post()
  @ApiOperation({ summary: '创建反馈' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.clientFeedbackService.create(createFeedbackDto)
  }
}
