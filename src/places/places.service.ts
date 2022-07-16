import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    return <Place>await this.placesRepository.save(createPlaceDto);
  }

  async findAll() {
    return await this.placesRepository.find({
      order: {
        targetDate: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return await this.placesRepository.findOneBy({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    await this.placesRepository.update(id, updatePlaceDto);
    return await this.placesRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.placesRepository.delete({ id });
  }
}
