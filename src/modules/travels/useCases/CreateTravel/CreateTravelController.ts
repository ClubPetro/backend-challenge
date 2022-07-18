import {Request, Response} from 'express';
import { container } from 'tsyringe';
import { CreateTravelUseCase } from './CreateTravelUseCase';
import { ItravelDTO } from './ITravelDTO';
class CreateTravelController{

    async handle(request:Request, response:Response){

        const {country, place, urlFlag, goal} = request.body as ItravelDTO;;
        const createTravelUseCase = container.resolve(CreateTravelUseCase);

        await createTravelUseCase.execute({
            country,
            place,
            urlFlag,
            goal
        })
        return response.status(201).send({message: "Travel created with success"});
    }
}


export {CreateTravelController}