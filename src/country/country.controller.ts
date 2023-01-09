import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
@ApiTags('Country')
@Controller('countrys')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo país',
  })
  @ApiCreatedResponse({
    type: CreateCountryDto,
  })
  @ApiConflictResponse({
    description: 'País já cadastrado',
  })
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.createCountry(createCountryDto);
  }
}
