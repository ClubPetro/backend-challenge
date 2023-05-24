import { injectable , inject} from "tsyringe"
import { IPlaceRepository } from "../../interface/IPlaceRepository"
import { AppError } from "@shared/error/AppError"
import { Place } from "@prisma/client"

@injectable()
class ListPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute(): Promise<Place[]>{

    try{
      const list = await this.placeRepository.list()

      if(list.length < 1){
        throw new AppError('list.Empty', 400)
      }

      return list;
    }catch(err){
      throw new AppError(`list.Failed - Error: ${err}`, 400)
    }
  }
}

export {ListPlaceUseCase}