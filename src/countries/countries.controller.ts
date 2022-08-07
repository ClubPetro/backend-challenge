import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { Country } from './country.entity';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiCreatedResponse({ type: [Country] })
  async get(): Promise<Country[]> {
    return await this.countriesService.get();
  }
}
