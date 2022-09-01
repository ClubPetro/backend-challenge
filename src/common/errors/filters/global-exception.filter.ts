import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
    QueryFailedError,
    EntityNotFoundError,
    CannotCreateEntityIdMapError,
} from 'typeorm';
import { GlobalResponseError } from '../global-response.error';
import { ErrorEnum } from '../enums/error.enum';
import { ThrottlerException } from '@nestjs/throttler';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const responseMessage = (exception as any)?.response?.message;
        const { constructor: exceptionTarget } = exception;
        const code = exceptionTarget.name;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = (exception as any)?.message.message;

        Logger.error(
            message,
            (exception as any)?.stack,
            `${request.method} ${request.url}`,
        );

        switch (exceptionTarget) {
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            case NotFoundException:
                status = HttpStatus.NOT_FOUND;
                message = (exception as NotFoundException).message;
                break;
            case QueryFailedError:
                if (
                    (exception as any).code === ErrorEnum.DUPLICATE_ENTRY_CODE
                ) {
                    status = HttpStatus.CONFLICT;
                    message = 'Place with goal already exists';
                    break;
                }
                message = (exception as QueryFailedError).message;
                break;
            case BadRequestException:
                status = HttpStatus.BAD_REQUEST;
                message = responseMessage;
                break;
            case ThrottlerException:
                status = HttpStatus.TOO_MANY_REQUESTS;
                message = (exception as ThrottlerException).message;
                break;
            case EntityNotFoundError:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as EntityNotFoundError).message;
                break;
            case CannotCreateEntityIdMapError:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as CannotCreateEntityIdMapError).message;
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        response
            .status(status)
            .json(GlobalResponseError(status, message, code, request));
    }
}
