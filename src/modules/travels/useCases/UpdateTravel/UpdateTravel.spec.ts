import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/implementations/DateProvider";
import { TravelsRepositoryInMemory } from "../../repositories/implementations/TravelsRepositoryInMemory"
import { UpdateTravelUseCase } from "./UpdateTravelUseCase";

let dateProvider:DateProvider;
let travelsRepositoryInMemory:TravelsRepositoryInMemory
let updateTravelUseCase: UpdateTravelUseCase;

describe("Update Travel UseCase",() =>{

    beforeAll(async ()=>{
        dateProvider = new DateProvider();
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        updateTravelUseCase = new UpdateTravelUseCase(travelsRepositoryInMemory, dateProvider);

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

    it("Should not be able to update a Travel with id invalid", async ()=>{
        expect(async ()=>{
            const request = {
                id:"12345",
                place:"Pernambuco",
                goal:"03/2023"
            }
            await updateTravelUseCase.execute(request);
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should not be able to update a Travel with a same country and place already exists", async ()=>{
        expect(async ()=>{
            const {id} = await travelsRepositoryInMemory.findByCountryAndPlace("Brasil", "Pernambuco");
            const request = {
                id,
                place:"Curitiba",
                goal:"03/2023"
            }
            await updateTravelUseCase.execute(request);
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should be able to update a Travel", async ()=>{
        const {id} = await travelsRepositoryInMemory.findByCountryAndPlace("Brasil", "Pernambuco");
        const request = {
            id,
            place:"Pernambuco",
            goal:"03/2023"
        }
        await updateTravelUseCase.execute(request);
        const {place,goal}= await travelsRepositoryInMemory.findById(id);
        expect({id, place, goal}).toEqual(request);      
        
    })

})