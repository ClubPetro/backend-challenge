import {DataSource} from 'typeorm';
const AppDataSource = new DataSource({
    type: "postgres",
    host: "database_desafio",
    port: 5432,
    username: "docker",
    password: "clubpetro",
    database: "desafioclubpetro",
    entities:["./src/modules/entities/*.ts"],
    migrations:["./src/database/migrations/*.ts"],
    migrationsRun:true,
    logging:true,
    synchronize:true,
    
})


export {AppDataSource};