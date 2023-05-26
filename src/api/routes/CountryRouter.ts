import { Router, Request, Response } from 'express';
import CountryController from '../controllers/CountryController';
import CountryService from '../services/CountryService';

const countryRouter = Router();
const countryService = new CountryService();
const contryController = new CountryController(countryService);

countryRouter.get('/', (req: Request, res: Response) => contryController.getAll(req, res));

export default countryRouter;
