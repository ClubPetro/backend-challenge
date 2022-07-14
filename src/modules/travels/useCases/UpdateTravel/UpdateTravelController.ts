import {Request, Response} from 'express';
import { container } from 'tsyringe';
import { UpdateTravelUseCase } from './UpdateTravelUseCase';


class UpdateTravelController{

    async handle(request:Request, response:Response): Promise<Response>{
        const {id} = request.params;
        const {place, goal} = request.body;
        const updateTravelUseCase = container.resolve(UpdateTravelUseCase);
        await updateTravelUseCase.execute({id,place,goal});
        return response.status(200).send({});
    }
}


export {UpdateTravelController}