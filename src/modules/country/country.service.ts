import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryEntity } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const country = await this.countryRepository.findOneBy({
      name: createCountryDto.name,
    });

    if (country) {
      throw new HttpException(
        'Country name is already exists',
        HttpStatus.NOT_FOUND,
      );
    }

    const countryCreated = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(countryCreated);
  }

  findAll() {
    return this.countryRepository.find({
      select: {
        id: true,
        name: true,
        flagUrl: true,
        createdAt: true,
      },
    });
  }

  findOneById(id: string) {
    return this.countryRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const country = await this.countryRepository.findOneBy({ id });

    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }

    const { affected } = await this.countryRepository.delete(id);

    if (!affected) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }

    return country;
  }
}
