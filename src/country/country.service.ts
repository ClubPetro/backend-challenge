import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  public async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    const checkCountry = await this.countryRepository.findOne({
      where: [{ name: createCountryDto.name }],
    });

    if (checkCountry) {
      throw new ConflictException('coountry already exists');
    }
    return await this.countryRepository.create(createCountryDto).save();
  }
}
