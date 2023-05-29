import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import HttpException from '../errors/HttpException';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log('err', err);
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default errorHandler;
