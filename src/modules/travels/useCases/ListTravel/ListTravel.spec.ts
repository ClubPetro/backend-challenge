import {ListTravelUseCase} from './ListTravelUseCase';
import {TravelsRepositoryInMemory} from '../../repositories/implementations/TravelsRepositoryInMemory';
import { CreateTravelUseCase } from '../CreateTravel/CreateTravelUseCase';
import { DateProvider } from '../../../../shared/providers/implementations/DateProvider';

let listTravelUseCase: ListTravelUseCase;
let travelsRepositoryInMemory: TravelsRepositoryInMemory;
let createTravelUseCase: CreateTravelUseCase;
let dateProvider: DateProvider;

describe("List Travel UseCase", () =>{

    beforeAll(async () =>{
        travelsRepositoryInMemory = new TravelsRepositoryInMemory();
        listTravelUseCase = new ListTravelUseCase(travelsRepositoryInMemory);
        dateProvider = new DateProvider();
        createTravelUseCase = new CreateTravelUseCase(travelsRepositoryInMemory,dateProvider);
        await createTravelUseCase.execute({
            country:"Netherlands",
            place: "Amsterdã",
            goal: "01/2023",
            urlFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png"
        });

        await createTravelUseCase.execute({
            country:"Denmark",
            place: "Copenhage",
            goal: "11/2022",
            urlFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png"
        });

    })

    it("Should be able to list an travel", async () => {
        const results = await listTravelUseCase.execute();
        expect(results.length).toBeTruthy()

    })

    it("Should be able to list travels in asc sort order", async () => {
        const results = await listTravelUseCase.execute();
        expect(results).toStrictEqual([...results].sort((a,b) => a.goal.getTime() - b.goal.getTime()))
    })
})