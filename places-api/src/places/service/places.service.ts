import { BadRequestException, ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../models/place.entity';
import { GetPlacesQuery } from '../places.helpers';
import { PaginatedData } from '../../helpers/common-classes'
@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private placesRepository: Repository<Place>
  ) { } //repository of place entity

  getInvalidDateFromPastException(): BadRequestException {
    return new BadRequestException(`You cannot set a destination to the past.`);
  }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentYear > createPlaceDto.year) throw this.getInvalidDateFromPastException();
    if (currentYear === createPlaceDto.year && currentMonth > createPlaceDto.month) throw this.getInvalidDateFromPastException();

    const isYearPlacePairUnique = await this.isCountryAndCountryPlacePairUnique(createPlaceDto.country_name, createPlaceDto.country_part);
    if (!isYearPlacePairUnique) throw new ConflictException(`A country-place-destination relationship with the same country-part combination already exists.`);

    const newEntity: Place = this.placesRepository.create({
      country_name: createPlaceDto.country_name,
      country_part: createPlaceDto.country_part,
      year: createPlaceDto.year,
      month: createPlaceDto.month,
      image_url: createPlaceDto.image_url,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return await newEntity.save();
  }

  async isCountryAndCountryPlacePairUnique(countryName: string, countryPart: string): Promise<boolean> {
    return await this.placesRepository.findOne({ where: { country_name: countryName, country_part: countryPart } }) === undefined;
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
  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    //if no fields are passed, throw exception
    //if country_part is passed, check if country-country_part pair is unique.
    //if year is passed, check if it's in the past.
    //if month is passed and year is not passed, assume already registered value and throw exception if it's in the past.
    //if year and month are passed, check if it's in the past.
    const isDTOEmpty = Object.keys(updatePlaceDto).length === 0;
    if (isDTOEmpty) throw new BadRequestException(`No fields were passed.`);

    const entity: Place = await this.assertEntityExists(id);

    if (updatePlaceDto.country_part !== undefined) {
      const isCountryPlacePairUnique = await this.isCountryAndCountryPlacePairUnique(entity.country_name, updatePlaceDto.country_part);
      if (!isCountryPlacePairUnique) throw new ConflictException(`A country-place-destination relationship with the same country-part combination already exists.`);
    }

    const dtoYear = typeof updatePlaceDto.year === 'undefined' ? entity.year : updatePlaceDto.year;
    const dtoMonth = typeof updatePlaceDto.month === 'undefined' ? entity.month : updatePlaceDto.month;


    if (currentYear > dtoYear) throw this.getInvalidDateFromPastException();
    if (currentYear === dtoYear && currentMonth > dtoMonth) throw this.getInvalidDateFromPastException();



    const updatedEntity = {
      ...updatePlaceDto,
      updated_at: currentDate,
    }
    await this.placesRepository.update(id, updatedEntity);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    await this.assertEntityExists(id);

    await this.placesRepository.delete(id);
    return true;
  }
}
