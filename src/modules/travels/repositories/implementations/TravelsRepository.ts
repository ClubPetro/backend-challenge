import { Travel } from "../../../entities/Travel";
import { ItravelDTO } from "../../useCases/CreateTravel/ITravelDTO";
import { ITravelsRepository } from "../ITravelsRepository";

class TravelsRepository implements ITravelsRepository{
    
    list(): Promise<Travel[]> {
        throw new Error("Method not implemented.");
    }
    findByCountryAndPlace(country:string, place:string): Promise<Travel> {
        throw new Error("Method not implemented.");
    }
    update(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(uiid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create({ }: ItravelDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export {TravelsRepository};