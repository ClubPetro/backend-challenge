import {DataSource} from 'typeorm';
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "clubpetro",
    database: "desafioclubpetro",
    entities:["./src/modules/entities/*.ts"],
    migrations:["./src/database/migrations/*.ts"],
    migrationsRun:true,
    logging:true
    
})

export {AppDataSource};