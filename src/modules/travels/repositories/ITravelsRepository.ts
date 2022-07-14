import {Travel} from '../../entities/Travel';
import {ItravelDTO} from '../useCases/CreateTravel/ITravelDTO';
import { IUpdateTravelDTO } from '../useCases/UpdateTravel/IUpdateTravelDTO';

interface ITravelsRepository{
    create(data: ItravelDTO): Promise<void>;
    list(): Promise<Travel[]>;
    findByCountryAndPlace(country:string, place:string): Promise<Travel>;
    findById(uuid:string): Promise<Travel>;
    update(data:IUpdateTravelDTO): Promise<void>;
    delete(uiid:string): Promise<void>;
}

export { ITravelsRepository };