import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { PlacesService } from '../service/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
@ApiTags("places")
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new country-place-destination relationship and returns the created id.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: `The informed date was not in the correct format or was prior to the date of the request.` })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The informed place has already been assigned for the informed country.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The country-place-destination relationship has been successfully created.' })
  @ApiBody({ type: CreatePlaceDto })
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all country-place-destination relationships.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'All the country-place-destination relationships have been succesfully fetched.' })
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully fetched.' })
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Either the date or the place were invalid.' })
  @ApiBody({ type: UpdatePlaceDto })
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully deleted.' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
