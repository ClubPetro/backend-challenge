import { injectable , inject} from "tsyringe"
import { IPlaceRepository } from "../../interface/IPlaceRepository"
import { AppError } from "@shared/error/AppError"
import { Place } from "@prisma/client"

interface IPayload {
  id: string,
  local: string,
  meta: string
}

@injectable()
class EditPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({id, local, meta}: IPayload): Promise<Place>{
    if(!id || !local || !meta){
      throw new AppError(`data.inconsistent: {ID: ${id}, Local: ${local}, Meta: ${meta}} `, 400)
    }

    const exists = await this.placeRepository.findById(id)

    if(!exists){
      throw new AppError('place.notExists', 400);
    }

    try{
      const placeUpdated = await this.placeRepository.update({
        id: Number(id),
        local,
        meta
      })

      return placeUpdated;
    }catch(err){
      throw new AppError(`edit.Failed - Error: ${err}`, 400)
    }
  }
}

export {EditPlaceUseCase}