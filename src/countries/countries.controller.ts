import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './country.entity';

@Controller('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async get(): Promise<Country[]> {
    return await this.countriesService.get();
  }
}
