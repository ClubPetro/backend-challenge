import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let errorMessage = 'Internal error, unable to process data';
    let status = 500;

    if (exception?.query) {
      status = 400;
    } else {
      status = exception?.status > 0 ? exception?.status : 400;
      const error = exception?.response;
      if (error) {
        const isArray = Array.isArray(error['message']);
        errorMessage = isArray ? error['message'][0] : error['message'];
      }
    }

    const returnedData = {
      success: false,
      error: errorMessage,
      timestamp: new Date(),
      path: request.url,
    };

    response.status(status).json(returnedData);
  }
}
