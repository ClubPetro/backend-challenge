import {DataSource} from 'typeorm';
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV === "test" ? "localhost": "database",
    port: 5432,
    username: "docker",
    password: "clubpetro",
    database: process.env.NODE_ENV === "test" ? "desafioclubpetro_test" : "desafioclubpetro",
    entities:["./src/modules/entities/*.ts"],
    migrations:["./src/database/migrations/*.ts"],
    migrationsRun:true,
    logging:true
    
})

export {AppDataSource};