import request from 'supertest';

import {app} from '../../../../app';
import { AppDataSource } from '../../../../database';
import {v4 as uuidV4} from 'uuid'

describe("Update Travel Controller", () =>{

    beforeAll(async () =>{
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

    afterAll(async () =>{
        await AppDataSource.createQueryRunner().clearTable("travels")
        await AppDataSource.destroy()
    })

    it("Should not be able to update a Travel with id invalid", async ()=>{
        const id = uuidV4()
        const response = await request(app).patch(`/travels/${id}`)
        .send({
            place:"Pernambuco",
            goal:"03/2023"
        })
        
        expect(response.status).toBe(404)
    })

    it("Should not be able to update a Travel with a same country and place already exists", async ()=>{
        const travels = await request(app).get("/travels")
        const response = await request(app).patch(`/travels/${travels.body.data[0].id}`)
        .send({
            place:"Pernambuco",
            goal:"03/2023"
        })
        expect(response.status).toBe(400)
    })

    it("Should be able to update a Travel", async ()=>{

        const travels = await request(app).get("/travels")
        const response = await request(app).patch(`/travels/${travels.body.data[1].id}`)
        .send({
            place:"Pernambuco",
            goal:"03/2023"
        })
        expect(response.status).toBe(200)
        
    })

    
})