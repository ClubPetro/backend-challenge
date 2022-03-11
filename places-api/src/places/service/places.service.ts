import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../models/place.entity';
import { GetPlacesQuery, MessageResponse } from '../places.helpers';
import { MAX_PAGE_SIZE, PaginatedData, CreationIDResponse } from '../places.helpers';
import { deepClean } from 'src/helpers/string';
@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placesRepository: Repository<Place>
  ) { } //repository of place entity

  async create(createPlaceDto: CreatePlaceDto): Promise<CreationIDResponse> {
    return { id: 1 };
  }

  async findAll(queryParams: GetPlacesQuery): Promise<PaginatedData> {
    const page = queryParams.page || 1;

    const [result, total] = await this.placesRepository.findAndCount({
      order: { year: "ASC", month: "ASC", id: "DESC" },
      take: MAX_PAGE_SIZE,
      skip: (page - 1) * MAX_PAGE_SIZE
    });

    return {
      data: result,
      total: total,
      page: page,
      total_pages: Math.ceil(total / MAX_PAGE_SIZE),
      page_size: MAX_PAGE_SIZE
    };
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
  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<MessageResponse> {
    const entity: Place = await this.assertEntityExists(id);

    const doesPlaceOfEntityRepeatInCountry = await this.doesPlaceRepeatInCountry(entity);
    if (doesPlaceOfEntityRepeatInCountry) throw new ConflictException(`Country-place-destination relationship with id:${id} already exists.`);


    return { message: `This action updates a #${id} place` };
  }

  async remove(id: number): Promise<MessageResponse> {
    await this.assertEntityExists(id);

    await this.placesRepository.delete(id);
    return { message: `Country-place-destination relationship of ${id} has been successfully deleted.` };
  }
}
