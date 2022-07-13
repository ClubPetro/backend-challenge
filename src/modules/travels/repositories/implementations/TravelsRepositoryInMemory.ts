import { Travel } from "../../../entities/Travel";
import { ItravelDTO } from "../../useCases/CreateTravel/ITravelDTO";
import { ITravelsRepository } from "../ITravelsRepository";

class TravelsRepositoryInMemory implements ITravelsRepository{
    
    travels: Travel[] =[];
    
    async create(data: ItravelDTO): Promise<void> {
        const travel = new Travel()
        Object.assign(travel, {
            ...data
        })
        this.travels.push(travel);
    }
    async list(): Promise<Travel[]> {
        const all = this.travels;
        return all;
    }

    async findByCountryAndPlace(country:string, place:string): Promise<Travel> {
        const result = this.travels.find(obj => obj.country.includes(country) && obj.place.includes(place));
        return result;
    }

    update(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(uiid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }  

}

export {TravelsRepositoryInMemory}