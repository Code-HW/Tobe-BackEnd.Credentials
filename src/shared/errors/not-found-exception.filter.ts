import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    response.status(404).json({
      statusCode: 404,
      message: 'Resource not found',
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
