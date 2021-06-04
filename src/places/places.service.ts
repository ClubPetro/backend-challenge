import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import format from 'date-fns/format';
import { CreatePlacesDto } from './dto/create-places.dto';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { Places } from './places.entity';
import { PlacesRepository } from './places.repository';

@Injectable()
export class PlacesService {

  constructor(
    @InjectRepository(PlacesRepository)
    private PlacesRepository: PlacesRepository,
  ) { }

  async createPlace(createPlacesDto: CreatePlacesDto): Promise<Places> {
    return await this.PlacesRepository.createPlace(createPlacesDto);
  }

  async updatePlace(id: number, updatePlacesDto: UpdatePlacesDto): Promise<Places> {
    return await this.PlacesRepository.updatePlace(id, updatePlacesDto);
  }

  async getPlaces(): Promise<Places[]> {
    return await this.PlacesRepository.getPlaces();
  }

  async getPlaceById(id: number): Promise<Places> {
    return await this.PlacesRepository.getPlaceById(id);
  }

  async deletePlace(id: number): Promise<void> {
    return await this.PlacesRepository.deletePlace(id);
  }




}
