import { ICreatePlaceDTO } from "../dtos/ICreatePlaceDTO"
import { IEditPlaceDTO } from "../dtos/IEditPlaceDTO"
import {Place} from '@prisma/client'

interface IPlaceRepository {
  create(data: ICreatePlaceDTO): Promise<void>
  update(data: IEditPlaceDTO): Promise<Place>
  delete(id: number): Promise<void>
  list(): Promise<Place[]>
  findDuplicateLocal(country: string, local: string): Promise<boolean>
  findById(id: string): Promise<Place>
}

export {IPlaceRepository}