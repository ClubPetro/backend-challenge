import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface IExceptionResponse {
  message: string[] | string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logger = new Logger(HttpExceptionFilter.name);
    logger.error(exception);
    logger.debug(
      JSON.stringify({
        request: {
          url: request.url,
          body: request.body,
        },
        exception,
      }),
    );

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse() as IExceptionResponse;

    if (statusCode)
      return response.status(statusCode).json({
        name: exception.constructor.name || '',
        message:
          (exceptionResponse?.message && exceptionResponse?.message[0]) ||
          exceptionResponse,
      });

    return response.status(statusCode || 500).json({
      message: exception.message || '',
      name: exception.constructor.name || '',
    });
  }
}
