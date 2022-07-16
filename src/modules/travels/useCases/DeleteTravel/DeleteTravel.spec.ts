import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/implementations/DateProvider";
import { TravelsRepositoryInMemory } from "../../repositories/implementations/TravelsRepositoryInMemory"
import { DeleteTravelUseCase } from "./DeleteTravelUseCase";

let dateProvider:DateProvider;
let travelsRepositoryInMemory:TravelsRepositoryInMemory
let deleteTravelUseCase: DeleteTravelUseCase;

describe("Delete Travel",() =>{

    beforeAll(async ()=>{
        dateProvider = new DateProvider();
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        deleteTravelUseCase = new DeleteTravelUseCase(travelsRepositoryInMemory);
        await travelsRepositoryInMemory.create({
            country: "Brasil",
            place:"Curitiba",
            goal: "11/2022",
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })

        await travelsRepositoryInMemory.create({
            country: "Brasil",
            place:"Pernambuco",
            goal: "01/2023",
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