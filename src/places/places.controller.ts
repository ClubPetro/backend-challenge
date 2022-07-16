import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Response } from 'express';
import { verifyUnwantedFields } from 'src/utils/validate-fields';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    if (verifyUnwantedFields(updatePlaceDto, ['country', 'countryFlagUrl'])) {
      throw new BadRequestException(
        'Only name and targetDate are available to update',
      );
    }

    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    await this.placesService.remove(+id);
    return response.status(HttpStatus.NO_CONTENT);
  }
}
