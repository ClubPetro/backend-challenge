import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "../routes";
import { AppError } from "../../Error/AppError";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(Number(err.statusCode)).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `internal error - ${err.message}`,
    });
  }
);

export { app };
