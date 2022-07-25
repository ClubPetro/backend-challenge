import {
  BaseException,
  Unauthorized,
  GenericException,
  ResourceNotFound,
  UnauthorizedAccess,
} from './exception.types';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost): any | void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof BadRequestException) {
      response.status(exception.getStatus());
      const exceptionResponse = exception.getResponse();
      const genericException = new GenericException(exception);
      response.json({
        code: genericException.code,
        message: exceptionResponse['message'],
      });
      return;
    }
    if (exception instanceof HttpException) {
      response.status(exception.getStatus());
      const exceptionResponse = exception.getResponse();
      if (exceptionResponse instanceof BaseException) {
        response.json({
          code: exceptionResponse.code,
          message: exceptionResponse.message,
        });
        return;
      }
      if (exception.getStatus() === HttpStatus.UNAUTHORIZED) {
        const unauthorized = new Unauthorized();
        response.json({
          code: unauthorized.code,
          message: unauthorized.message,
        });
        return;
      }
      if (exception.getStatus() === HttpStatus.NOT_FOUND) {
        const resourceNotFound = new ResourceNotFound();
        response.json({
          code: resourceNotFound.code,
          message: resourceNotFound.message,
        });
        return;
      }
      debugger; // TODO: Handle side cases
    }
    if (exception instanceof BaseException) {
      response.status(exception.statusCode).json({
        code: exception.code,
        message: exception.message,
      });
      return;
    }
    if (exception instanceof ForbiddenException) {
      const unauthorizedAccessError = new UnauthorizedAccess(exception.message);
      response.status(HttpStatus.FORBIDDEN).json({
        code: unauthorizedAccessError.exceptionCode,
        message: exception.message,
      });
      return;
    }
    const genericException = new GenericException(exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: genericException.code,
      message: genericException.message,
    });
  }
}
