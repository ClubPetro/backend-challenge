import { BadRequestException, ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../models/place.entity';
import { GetPlacesQuery } from '../places.helpers';
import { deepClean } from 'src/helpers/string';
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
  async doesPlaceRepeatInCountry(entity: Place): Promise<boolean> {
    const deepPlace: string = deepClean(entity.country_part).toLowerCase();
    const deepCountry: string = deepClean(entity.country_name).toLowerCase();

    const entitiesWithSameCountryAndPlace: Place[] = await this.placesRepository.find({
      where: {
        country_part: deepPlace,
        country_name: deepCountry,
        id: Not(entity.id)
      }
    });

    if (entitiesWithSameCountryAndPlace.length > 0) return true;
    return false;
  }
  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<boolean> {
    const entity: Place = await this.assertEntityExists(id);

    const doesPlaceOfEntityRepeatInCountry = await this.doesPlaceRepeatInCountry(entity);
    if (doesPlaceOfEntityRepeatInCountry) throw new ConflictException(`Country-place-destination relationship with id:${id} already exists.`);

    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.assertEntityExists(id);

    await this.placesRepository.delete(id);
    return true;
  }
}
