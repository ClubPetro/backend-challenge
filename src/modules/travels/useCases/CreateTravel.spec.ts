import {TravelsRepositoryInMemory} from "../repositories/implementations/TravelsRepositoryInMemory";
import { CreateTravelUseCase } from "./CreateTravelUseCase"

let createTravelUseCase: CreateTravelUseCase;
let travelsRepositoryInMemory: TravelsRepositoryInMemory;


describe("Create Travel", () =>{

    beforeAll(()=>{
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        createTravelUseCase = new CreateTravelUseCase(travelsRepositoryInMemory);
    })

    it("Should be able to create a new travel", async () => {
        await createTravelUseCase.execute({
            country: "Brasil",
            place:"Curitiba",
            goal: new Date("2022-11"),
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        });

        expect((await travelsRepositoryInMemory.list()).length).toBeTruthy();
        
    })
})