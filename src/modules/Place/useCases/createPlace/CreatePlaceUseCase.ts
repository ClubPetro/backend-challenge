import { injectable , inject} from "tsyringe"
import { IPlaceRepository } from "../../interface/IPlaceRepository"
import { ICreatePlaceDTO } from "@modules/Place/dtos/ICreatePlaceDTO"
import { AppError } from "@shared/error/AppError"

@injectable()
class CreatePlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({country,local,meta, url}: ICreatePlaceDTO): Promise<void>{
    if(!country || !local || !meta || !url){
      throw new AppError(`data.inconsistent: {Country: ${country}, Local: ${local}, Meta: ${meta}, Url: ${url} `, 400)
    }

    const duplicated = await this.placeRepository.findDuplicateLocal(country,local);

    if(duplicated){
      throw new AppError('place.duplicateLocal',400)
    }

    try{
      await this.placeRepository.create({
        country,
        local,
        meta,
        url
      })
    }catch(err){
      throw new AppError(`created.Failed - Error: ${err}`, 400)
    }
  }
}

export {CreatePlaceUseCase}