import request  from "supertest";
import { app } from "../../../../app"
import { AppDataSource } from "../../../../database"
import {v4 as uuidV4} from 'uuid'

describe("Delete Travel Controller",  () =>{

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

    
    it("Should be able to delete a Travel", async ()=>{
        const travels = await request(app).get("/travels")
        
        const response = await request(app).delete(`/travels/${travels.body.data[0].id}`)
        expect(response.status).toBe(200);      
        
    })

    it("Should not be able to delete a Travel that id does not exists ", async ()=>{
        const id = uuidV4()
        const response = await request(app).delete(`/travels/${id}`)
        expect(response.status).toBe(404)
    })

})