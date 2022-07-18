import {DataSource} from 'typeorm';
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV == "test" ? "localhost" : "database_desafio",
    port: 5432,
    username: "docker",
    password: "clubpetro",
    database: process.env.NODE_ENV == "test" ? "test" : "desafioclubpetro",
    entities:["./src/modules/entities/*.ts"],
    migrations:["./src/database/migrations/*.ts"],
    migrationsRun:true,
})


export {AppDataSource};