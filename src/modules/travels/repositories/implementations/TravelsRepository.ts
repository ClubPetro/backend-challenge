import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Travel } from "../../../entities/Travel";
import { ItravelDTO } from "../../useCases/CreateTravel/ITravelDTO";
import { IUpdateTravelDTO } from "../../useCases/UpdateTravel/IUpdateTravelDTO";
import { ITravelsRepository } from "../ITravelsRepository";

class TravelsRepository implements ITravelsRepository{
    
    private repository: Repository<Travel>;
    constructor(){
        this.repository = AppDataSource.getRepository(Travel);
    }
    async list(): Promise<Travel[]> {
        const result = await this.repository.find({
            order:{
                goal:"ASC"
            }
        })
        return result;
    }
    async findByCountryAndPlace(country:string, place:string): Promise<Travel> {
        const result = await  this.repository.findOneBy({country, place})

        return result;
    }
    async findById(id: string): Promise<Travel> {
        const result = await this.repository.findOneBy({id});
        return result;
    }
    async update(data:IUpdateTravelDTO): Promise<void> {
        const travel = await this.repository.findOneBy({id:data.id});
        travel.place = data.place ? data.place : travel.place;
        travel.goal = data.goal ? data.goal : travel.goal;
        await this.repository.save(travel);
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id});
    }
    async create(data: ItravelDTO): Promise<void> {
        const travel = this.repository.create(data)
        await this.repository.save(travel);
    }
}

export {TravelsRepository};