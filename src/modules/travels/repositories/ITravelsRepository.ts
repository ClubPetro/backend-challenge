import {ItravelDTO} from '../dtos/ITravelDTO';
import {Travel} from '../../entities/Travel';

interface ITravelsRepository{
    create(data: ItravelDTO): Promise<void>;
    list(): Promise<Travel[]>;
    findByCountryAndPlace(country:string, place:string): Promise<Travel>;
    update(uuid:string): Promise<void>;
    delete(uiid:string): Promise<void>;
}

export { ITravelsRepository };