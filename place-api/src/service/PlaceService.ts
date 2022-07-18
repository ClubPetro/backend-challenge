import { Injectable } from '@nestjs/common'
import { CreatePlaceDTO } from '../domain/dto/CreatePlaceDTO'
import { Place } from '../domain/model/Place'
import { PlaceRepository } from '../repository/PlaceRepository'

@Injectable()
export default class PlaceService {
    constructor(private readonly repository: PlaceRepository) {}

    async getAll(): Promise<Place[]> {
        const response = await this.repository.findAll()
        return response
    }

    async findByPlaceById(id: string): Promise<Place> {
        const response = await this.repository.findByPlaceById(id)
        return response
    }

    async executeSave(payload: CreatePlaceDTO): Promise<Place> {
        const response = (await this.repository.create(payload)) as Place
        return response
    }

    async executeUpdate(id: string, payload: CreatePlaceDTO): Promise<Place> {
        const place = await this.repository.update(id, payload)
        return place
    }

    async deleteById(id: string): Promise<Place> {
        const response = await this.repository.deleteById(id)
        return response
    }
}
