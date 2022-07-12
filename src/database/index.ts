import {DataSource} from 'typeorm';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "clubpetro",
    database: "desafioclubpetro",
    entities:["../modules/entities/*.ts"],
    migrations:["migrations/*.ts"],
    
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
