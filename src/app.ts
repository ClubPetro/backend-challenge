import express from 'express';
import cors from 'cors';
import errorHandler from './api/middlewares/ErrorHandler';
import { countryRouter, placesRouter } from './api/routes';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.use('/countries', countryRouter);
    this.app.use('/places', placesRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export const { app } = new App();