import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../models/place.entity';
@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placesRepository: Repository<Place>
  ) { } //repository of place entity

  async create(createPlaceDto: CreatePlaceDto): Promise<number> {
    return 1;
  }

  async findAll(): Promise<string> {
    return `This action returns all places`;
  }

  async findOne(id: number): Promise<Place> {
    const entity: Place = await this.placesRepository.findOne(id);
    if (entity === undefined) throw new NotFoundException(`No country-place-destination relationship with id:${id} were found.`);


    return entity;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<string> {
    return `This action updates a #${id} place`;
  }

  async remove(id: number): Promise<string> {
    const entityToBeRemoved: Place = await this.placesRepository.findOne(id);
    if (entityToBeRemoved === undefined) throw new NotFoundException(`No country-place-destination relationship with id:${id} were found.`);

    await this.placesRepository.delete(id);
    return `Country-place-destination relationship of ${id} has been successfully deleted.`;
  }
}
