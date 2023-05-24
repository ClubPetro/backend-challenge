import 'reflect-metadata';
import express,  { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { router } from './routes';
import '../../container'
import { AppError } from '@shared/error/AppError';

const app = express()

app.use(cors());
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({ status: 'error', message: `Internal server error - ${err.message}` });
});

export {app};