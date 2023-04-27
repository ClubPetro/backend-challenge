import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Utils } from '../utils/utils';
@Injectable()
export class NomenclatureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req.body = Utils.convertSnakeToCamel(req.body);
    next();
  }
}
