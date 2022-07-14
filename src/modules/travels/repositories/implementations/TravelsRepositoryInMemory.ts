import { Travel } from "../../../entities/Travel";
import { ItravelDTO } from "../../useCases/CreateTravel/ITravelDTO";
import { IUpdateTravelDTO } from "../../useCases/UpdateTravel/IUpdateTravelDTO";
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
        //return ascending goals
        return all.sort((a, b) => a.goal.getTime() -b.goal.getTime());
    }

    async findByCountryAndPlace(country:string, place:string): Promise<Travel> {
        const result = this.travels.find(obj => obj.country.includes(country) && obj.place.includes(place));
        return result;
    }

    async findById(uuid: string): Promise<Travel> {
        const result = this.travels.find(obj => obj.id == uuid);
        return result;
    }

    async update(data: IUpdateTravelDTO): Promise<void> {
        const objIndex = this.travels.findIndex(obj => obj.id == data.id);
       this.travels[objIndex].goal = data.goal;
       this.travels[objIndex].place = data.place;
    }
    delete(uiid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }  

}

export {TravelsRepositoryInMemory}