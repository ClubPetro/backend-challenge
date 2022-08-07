import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: MongoRepository<Country>,
  ) {}

  async get(): Promise<Country[]> {
    return await this.countriesRepository.find({ order: { name: 'ASC' } });
  }
}
