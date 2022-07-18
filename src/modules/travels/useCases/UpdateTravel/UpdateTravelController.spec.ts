import request from 'supertest';

import {app} from '../../../../app';
import { AppDataSource } from '../../../../database';

describe("Update Travel Controller", () =>{

    beforeEach(async () =>{
        await AppDataSource.initialize()

        await request(app).post("/travels")
        .send({
            country: "Brasil",
            place:"Curitiba",
            goal: "11/2022",
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })

        await request(app).post("/travels")
        .send({
            country: "Brasil",
            place:"Pernambuco",
            goal: "01/2023",
            urlFlag:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png"
        })
    })

    afterEach(async () =>{
        await AppDataSource.dropDatabase()
        await AppDataSource.destroy()
    })

    it("Should not be able to update a Travel with id invalid", async ()=>{
        const response = await request(app).patch("/travels/22222")
        .send({
            place:"Pernambuco",
            goal:"03/2023"
        })
        
        expect(response.status).toBe(404)
    })

    it("Should not be able to update a Travel with a same country and place already exists", async ()=>{
        const travels = await request(app).get("/travels")
        const response = await request(app).patch(`/travels/${travels.body.data[0]}`)
        .send({
            place:"Curitiba",
            goal:"03/2023"
        })
        expect(response.status).toBe(400)
    })

    it("Should be able to update a Travel", async ()=>{

        const travels = await request(app).get("/travels")
        const response = await request(app).patch(`/travels/${travels.body.data[0]}`)
        .send({
            id: travels.body.data[0],
            place:"Pernambuco",
            goal:"03/2023"
        })
        expect(response.status).toBe(200)
        
    })

    
})