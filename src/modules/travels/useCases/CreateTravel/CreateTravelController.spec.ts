import request from 'supertest';

import {app} from '../../../../app';
import { AppDataSource } from '../../../../database';

describe("Create Travel Controller", () =>{
    
    beforeAll(async () =>{
        await AppDataSource.initialize()
    })

    afterAll(async () =>{
        await AppDataSource.createQueryRunner().clearTable("travels")
        await AppDataSource.destroy()
    })


    it("Should be able to create a new Travel", async () =>{

        const response = await request(app).post("/travels")
        .send({
            "country":"Brazil",
            "place":"Fortaleza",
            "goal":"05/2022",
            "urlFlag":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })

        expect(response.status).toBe(201)
        
    })

    it("Should not be able to create a new travel with same country and place", async () => {

        const body = {
            "country":"Brazil",
            "place":"Fortaleza",
            "goal":"05/2022",
            "urlFlag":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        };
        await request(app).post("/travels")
            .send(body)
        const response = await request(app).post("/travels")
            .send(body)
        expect(response.status).toBe(400)
    })

})