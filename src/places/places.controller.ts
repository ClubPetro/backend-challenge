import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Res, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlacesDto } from './dto/create-places.dto';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { Places } from './places.entity';
import { PlacesService } from './places.service';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('Places')
export class PlacesController {

  constructor(
    private PlacesService: PlacesService) { }

  private logger = new Logger('Places');

  @ApiOperation({ summary: 'Create Places ' })
  @ApiBody({ type: CreatePlacesDto })
  @ApiCreatedResponse({ description: 'Successfully created place.' })
  @ApiBadRequestResponse({ description: 'Invalid  date format or date is before today.' })
  @ApiConflictResponse({ description: 'Place already exist for this country' })
  @Post()
  createPlace(
    @Body() createPlacesDto: CreatePlacesDto
  ): Promise<Places> {
    this.logger.verbose(`Request create place`);
    return this.PlacesService.createPlace(createPlacesDto);
  }

  @ApiOperation({ summary: 'Get all places ' })
  @ApiOkResponse({ description: 'Sucessfully get all list.' })
  @ApiConflictResponse({ description: 'Place already exists for country request update' })
  @Get()
  getPlaces(): Promise<Places[]> {
    this.logger.verbose(`Request get all places`);
    return this.PlacesService.getPlaces();
  }

  @ApiOperation({ summary: 'Get place by ID' })
  @ApiOkResponse({ description: 'Sucessfully get place;' })
  @ApiNotFoundResponse({ description: 'Not found place for ID' })
  @Get('/:id')
  getPlaceById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Places> {
    this.logger.verbose(`Request get place by id `);
    return this.PlacesService.getPlaceById(id);
  }
  @ApiOperation({ summary: 'Update place' })
  @ApiBody({ type: UpdatePlacesDto })
  @ApiOkResponse({ description: 'Sucessfully update place' })
  @ApiNotFoundResponse({ description: 'No place for ID or no parameter found in request' })
  @ApiConflictResponse({ description: 'Place already exists for country request update' })
  @ApiBadRequestResponse({ description: 'Invalid date format date or date is before date now.' })
  @Put('/:id')
  updatePlace(
    @Body() updatePlacesDto: UpdatePlacesDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Places> {
     this.logger.verbose(`Request update place`);
    return this.PlacesService.updatePlace(id, updatePlacesDto);
  }

  @ApiOperation({ summary: 'Delete place ' })
  @ApiOkResponse({ description: 'Place deleted successfully' })
  @ApiNotFoundResponse({ description: 'Place not found for delete.' })
  @Delete('/:id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    this.logger.verbose(`Request delete place`);
    return this.PlacesService.deletePlace(id);
  }

}
