import {
  Catch,
  ArgumentsHost,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import {
  NoContentError,
  NotFoundError,
  ServiceUnavailableError,
  SystemError,
  UnauthorizedError,
  ValidationError,
} from '@/shared/domain';

@Catch(Error)
export class HttpExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
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

    let statusCode;
    if (exception instanceof NoContentError) statusCode = 204;
    else if (exception instanceof SystemError) statusCode = 400;
    else if (exception instanceof UnauthorizedError) statusCode = 401;
    else if (exception instanceof JsonWebTokenError) statusCode = 401;
    else if (exception instanceof NotFoundError) statusCode = 404;
    else if (exception instanceof ValidationError) statusCode = 422;
    else if (exception instanceof ServiceUnavailableError) statusCode = 503;

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as any;
      return response.status(res.statusCode).json(res.message);
    }

    if (statusCode) return response.status(statusCode).json(exception);

    return response.status(exception.status || 500).json({
      errorMessage: exception.message || '',
      name: exception.constructor.name || '',
    });
  }
}
