import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";

import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3334, () => {
  console.log("Server at port 3334");
});
