import { Request } from 'express';
import { ResponseError } from 'src/common/errors/interfaces/response-error.interface';

export const GlobalResponseError: (
    statusCode: number,
    message: string,
    code: string,
    request: Request,
) => ResponseError = (
    statusCode: number,
    message: string,
    code: string,
    request: Request,
): ResponseError => {
    return {
        statusCode: statusCode,
        message,
        code,
        path: request.url,
        method: request.method,
    };
};
