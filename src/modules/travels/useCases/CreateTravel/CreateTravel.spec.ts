import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/implementations/DateProvider";
import {TravelsRepositoryInMemory} from "../../repositories/implementations/TravelsRepositoryInMemory";
import { CreateTravelUseCase } from "./CreateTravelUseCase";

let createTravelUseCase: CreateTravelUseCase;
let travelsRepositoryInMemory: TravelsRepositoryInMemory;
let dateProvider: DateProvider;


describe("Create Travel", () =>{

    beforeAll(()=>{
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        dateProvider = new DateProvider();
        createTravelUseCase = new CreateTravelUseCase(travelsRepositoryInMemory, dateProvider);
    })

    it("Should be able to create a new travel", async () => {
        await createTravelUseCase.execute({
            country: "Brasil",
            place:"Curitiba",
            goal: "06/2023",
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        });

        const result = await travelsRepositoryInMemory.list();
        expect(result.length).toBeTruthy();
        
    })

    it("Should not be able to create a new travel with same country and place", async () => {
        expect(async () =>{
            const data = {
                country: "Brasil",
                place:"Curitiba",
                goal: dateProvider.convertStringToDate("11/2022"),
                urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
            };
            await createTravelUseCase.execute(data);
            await createTravelUseCase.execute(data);
        }).rejects.toBeInstanceOf(AppError);
        
    })
})