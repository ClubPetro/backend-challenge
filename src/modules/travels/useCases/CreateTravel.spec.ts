import { DateProvider } from "../../../shared/providers/implementations/DateProvider";
import {TravelsRepositoryInMemory} from "../repositories/implementations/TravelsRepositoryInMemory";
import { CreateTravelUseCase } from "./CreateTravelUseCase"

let createTravelUseCase: CreateTravelUseCase;
let travelsRepositoryInMemory: TravelsRepositoryInMemory;
let dateProvider: DateProvider;


describe("Create Travel", () =>{

    beforeAll(()=>{
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        createTravelUseCase = new CreateTravelUseCase(travelsRepositoryInMemory);
        dateProvider = new DateProvider();
    })

    it("Should be able to create a new travel", async () => {
        await createTravelUseCase.execute({
            country: "Brasil",
            place:"Curitiba",
            goal: dateProvider.convertStringToDate("2022-11"),
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        });

        const result = await travelsRepositoryInMemory.list();
        console.log(result);
        expect(result.length).toBeTruthy();
        
    })
})