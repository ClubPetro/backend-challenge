import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/implementations/DateProvider";
import { TravelsRepositoryInMemory } from "../../repositories/implementations/TravelsRepositoryInMemory"
import { DeleteTravelUseCase } from "./DeleteTravelUseCase";
import {container} from 'tsyringe'

let dateProvider:DateProvider;
let travelsRepositoryInMemory:TravelsRepositoryInMemory
let deleteTravelUseCase: DeleteTravelUseCase;

describe("Delete Travel",() =>{

    beforeAll(async ()=>{
        dateProvider = new DateProvider();
       /*  travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        deleteTravelUseCase = new DeleteTravelUseCase(travelsRepositoryInMemory); */
        deleteTravelUseCase = container.resolve(DeleteTravelUseCase)
        await travelsRepositoryInMemory.create({
            country: "Brasil",
            place:"Curitiba",
            goal: dateProvider.convertStringToDate("2022-11"),
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })

        await travelsRepositoryInMemory.create({
            country: "Brasil",
            place:"Pernambuco",
            goal: dateProvider.convertStringToDate("2023-01"),
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })

    })

    it("Should not be able to delete a Travel that id does not exists ", async ()=>{
        expect(async ()=>{
            const id = "12345";
            await deleteTravelUseCase.execute(id);
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should be able to delete a Travel", async ()=>{
        const {id} = await travelsRepositoryInMemory.findByCountryAndPlace("Brasil", "Pernambuco");
        await deleteTravelUseCase.execute(id);
        const result = await travelsRepositoryInMemory.findById(id);
        expect(result).toBeFalsy();      
        
    })

})