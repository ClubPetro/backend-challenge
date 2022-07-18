import request from 'supertest';

import {app} from '../../../../app';
import { AppDataSource } from '../../../../database';

describe("List Travel Controller", () =>{

    beforeAll(async () =>{
        await AppDataSource.initialize()

        await request(app).post("/travels")
        .send({
            country:"Netherlands",
            place: "Amsterdã",
            goal: "01/2023",
            urlFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png"
        })

        await request(app).post("/travels")
        .send({
            country:"Denmark",
            place: "Copenhage",
            goal: "11/2022",
            urlFlag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png"
        })
    })

    afterAll(async () =>{
        await AppDataSource.createQueryRunner().clearTable("travels")
        await AppDataSource.destroy()
    })
    

    it("Should be able to list an travel", async () => {

        const response = await request(app).get("/travels")
        expect(response.status).toBe(200)

    })

    it("Should be able to list travels in asc sort order", async () => {
        const response = await request(app).get("/travels")
        expect(response.body.data[0].country).toBe("Denmark")
    })

    
})