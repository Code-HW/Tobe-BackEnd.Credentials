import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('status')
@Controller('status')
export class StatusController {
  @Get()
  @ApiOperation({ summary: 'Get application status' })
  @ApiResponse({
    status: 200,
    description: 'Application is running and healthy.'
  })
  getStatus() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString()
    }
  }
}
