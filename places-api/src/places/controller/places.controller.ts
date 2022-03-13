import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { PlacesService } from '../service/places.service';
import { Place } from '../models/place.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetPlacesQuery } from '../places.helpers';
import { JSONResponse, CommonJSONResponses } from 'src/helpers/common-response-models';
import { MAX_PAGE_SIZE } from '../config/places.config';
import { PaginatedData } from 'src/helpers/common-classes';
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
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<any> {
    return await this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiOperation({ summary: `Returns country-place-destination relationships in pages of ${MAX_PAGE_SIZE}(or specified limit) entries.` })
  @ApiResponse({ status: HttpStatus.OK, description: 'Country-place-destination relationships have been succesfully fetched.' })
  @ApiQuery({
    name: "page",
    type: Number,
    description: "A page parameter. If not supplied, assume 1.",
    required: false
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    description: `A limit parameter. If not supplied, assume ${MAX_PAGE_SIZE}.`,
    required: false
  })
  async findAll(@Query() queryParams: GetPlacesQuery): Promise<JSONResponse> {
    queryParams.page = queryParams.page || 1;
    queryParams.limit = queryParams.limit || MAX_PAGE_SIZE;

    const places: PaginatedData = await this.placesService.findAll(queryParams);
    return CommonJSONResponses.success(places);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully fetched.' })
  async findOne(@Param('id') id: string): Promise<Place> {
    return await this.placesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Either the date or the place were invalid.' })
  @ApiBody({ type: UpdatePlaceDto })
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto): Promise<any> {
    return await this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a country-place-destination relationship by its id.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The specified country-place-destination relationship did not exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The specified country-place-destination relationship has been successfully deleted.' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<JSONResponse> {
    await this.placesService.remove(+id);
    return CommonJSONResponses.success();
  }
}
