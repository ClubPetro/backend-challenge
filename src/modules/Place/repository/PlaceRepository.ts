import { Place, PrismaClient } from "@prisma/client";
import { ICreatePlaceDTO } from "../dtos/ICreatePlaceDTO";
import { IEditPlaceDTO } from "../dtos/IEditPlaceDTO";
import { IPlaceRepository } from "../interface/IPlaceRepository";

const prisma = new PrismaClient()

class PlaceRepository implements IPlaceRepository{
  async create({country,local, meta, url}: ICreatePlaceDTO): Promise<void> {
    await prisma.place.create({
      data:{
        country,
        local,
        meta,
        url,
      }
    })
  }
  async update({id, local, meta}: IEditPlaceDTO): Promise<Place> {

    const placeUpdated = await prisma.place.update({
      where:{
        id
      },
      data:{
        local,
        meta,
        updatedAt: new Date()
      }
    })

    return placeUpdated
  }
  async delete(id: number): Promise<void> {
    await prisma.place.delete({
      where:{
        id
      }
    })
  }
  async list(): Promise<Place[]> {
    const list = await prisma.place.findMany({
      orderBy: {
        meta:'asc'
      }
    })

    return list
  }
  async findDuplicateLocal(country: string, local: string): Promise<boolean> {
    const localDup = await prisma.place.findFirst({
      where:{
        country,
        local
      }
    })

    if(localDup){
      return true
    }else{
      return false
    }
  }

  async findById(id: string): Promise<Place> {
    const place = await prisma.place.findFirst({
      where:{
        id: Number(id)
      }
    })

    if(place.id === Number(id)){
      return place
    }else{
      return null
    }

  }

}

export {PlaceRepository}