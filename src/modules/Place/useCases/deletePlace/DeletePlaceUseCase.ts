import { injectable , inject} from "tsyringe"
import { IPlaceRepository } from "../../interface/IPlaceRepository"
import { AppError } from "@shared/error/AppError"

interface IPayload {
  id: string
}

@injectable()
class DeletePlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({id}: IPayload): Promise<void>{
    if(!id){
      throw new AppError(`data.inconsistent: {ID: ${id} `, 400)
    }

    try{
      await this.placeRepository.delete(Number(id))
    }catch(err){
      throw new AppError(`delete.Failed - Error: ${err}`, 400)
    }
  }
}

export {DeletePlaceUseCase}