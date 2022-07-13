import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreatePlace,
  DeletePlace,
  FindPlace,
  FindPlaces,
  UpdatePlace,
} from '@/places/data';
import { Place, PlaceSchema } from '@/places/domain';
import { PostgresPlacesRepository } from '@/places/infra';

import { CreatePlaceDto, UpdatePlaceDto } from './dto';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(
    @InjectRepository(PlaceSchema)
    private repository: Repository<PlaceSchema>,
  ) {}

  private placesRepository = new PostgresPlacesRepository(this.repository);

  @HttpCode(201)
  @ApiOperation({ summary: 'Create Place' })
  @ApiCreatedResponse({
    description: 'The object of created: Place.',
    type: Place,
  })
  @Post()
  async create(@Body() payload: CreatePlaceDto): Promise<Place> {
    const useCase = new CreatePlace(this.placesRepository);
    return await useCase.execute(payload);
  }

  @ApiOperation({ summary: 'Find Places' })
  @ApiOkResponse({
    description: 'The list of records found: Place.',
    isArray: true,
    type: Place,
  })
  @Get()
  async findAll(): Promise<Place[]> {
    const useCase = new FindPlaces(this.placesRepository);
    return await useCase.execute();
  }

  @ApiOperation({ summary: 'Find Place' })
  @ApiOkResponse({
    description: 'The object of record found: Place.',
    type: Place,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Place> {
    const useCase = new FindPlace(this.placesRepository);
    return await useCase.execute(id);
  }

  @HttpCode(204)
  @ApiOperation({ summary: 'Update Place' })
  @ApiNoContentResponse({
    description: 'The object of updated: Place.',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePlaceDto,
  ): Promise<void> {
    const useCase = new UpdatePlace(this.placesRepository);
    await useCase.execute(id, payload);
  }

  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Place' })
  @ApiNoContentResponse({
    description: 'The object of deleted: Place.',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const useCase = new DeletePlace(this.placesRepository);
    await useCase.execute(id);
  }
}
