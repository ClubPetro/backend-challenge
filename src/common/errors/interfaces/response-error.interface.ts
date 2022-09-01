export interface ResponseError {
    statusCode: number;
    message: string;
    code: string;
    path: string;
    method: string;
}
