import { BadRequestException, ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../models/place.entity';
import { GetPlacesQuery } from '../places.helpers';
import { PaginatedData } from 'src/helpers/common-classes';
@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placesRepository: Repository<Place>
  ) { } //repository of place entity

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return new Place();
    // return { id: 1 };
  }

  async findAll(queryParams: GetPlacesQuery): Promise<PaginatedData> {
    const [result, total] = await this.placesRepository.findAndCount({
      order: { year: "ASC", month: "ASC", id: "DESC" },
      take: queryParams.limit,
      skip: (queryParams.page - 1) * queryParams.limit,
    });

    return {
      items: result,
      meta: {
        total_item_count: total,
        total_page_count: Math.ceil(total / queryParams.limit),
        current_page: queryParams.page,
        current_page_item_count: result.length,
        max_items_per_page: queryParams.limit
      }
    }
  }

  async findOne(id: number): Promise<Place> {
    const entity: Place = await this.assertEntityExists(id);

    return entity;
  }

  async assertEntityExists(id: number): Promise<Place> {
    const entity: Place = await this.placesRepository.findOne(id);
    if (entity === undefined) throw new NotFoundException(`No country-place-destination relationship with id:${id} were found.`);

    return entity;
  }
  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<boolean> {
    const entity: Place = await this.assertEntityExists(id);

    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.assertEntityExists(id);

    await this.placesRepository.delete(id);
    return true;
  }
}
