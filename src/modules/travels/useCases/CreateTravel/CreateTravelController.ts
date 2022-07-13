import {Request, Response} from 'express';

class CreateTravelController{

    handle(request:Request, response:Response): Response {

        return response.send({"message":"ok"})
    }
}


export {CreateTravelController}