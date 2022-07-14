import {Request, Response} from 'express';
import { ListTravelUseCase } from './ListTravelUseCase';
import { container } from 'tsyringe';
class ListTravelController{

    async handle(request:Request, response:Response){
        const data = request.body;
        const listTravelUseCase = container.resolve(ListTravelUseCase);
        const results = await listTravelUseCase.execute();
        response.status(200).send({
            data:results
        });
    }
}

export { ListTravelController }