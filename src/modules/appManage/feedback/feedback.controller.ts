import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateFeedbackDto, UpdateFeedbackDto } from './feedback.dto'
import { FeedbackService } from './feedback.service'

@ApiTags('App Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: '创建反馈' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto)
  }

  @Get()
  @ApiOperation({ summary: '获取所有反馈' })
  findAll() {
    return this.feedbackService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取特定反馈' })
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新反馈' })
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, updateFeedbackDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除反馈' })
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id)
  }
}
