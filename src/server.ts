import app  from "./app";
import {AppDataSource} from "./database"

(async () =>{

    await AppDataSource.initialize();
    app.listen(3000, () => console.log("Server is running"));
})();
