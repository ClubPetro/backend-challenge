import { Router } from "express"
import { CreateTravelController } from "../modules/travels/useCases/CreateTravel/CreateTravelController"
import { DeleteTravelController } from "../modules/travels/useCases/DeleteTravel/DeleteTravelController"
import { ListTravelController } from "../modules/travels/useCases/ListTravel/ListTravelController"
import { UpdateTravelController } from "../modules/travels/useCases/UpdateTravel/UpdateTravelController"


const travelRoutes = Router()

const createTravelController = new CreateTravelController()
const updateTravelController = new UpdateTravelController()
const listTravelController = new ListTravelController()
const deleteTravelController = new DeleteTravelController()

travelRoutes.post("/", createTravelController.handle )
travelRoutes.delete("/:id", deleteTravelController.handle )
travelRoutes.get("/", listTravelController.handle )
travelRoutes.patch("/:id", updateTravelController.handle )


export {travelRoutes}