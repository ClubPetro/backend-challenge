import {
  Controller,
  Post,
  Body,
  Put,
  HttpCode,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { BaseController } from '../../shared/controllers/base.controller';
import { CreateWorldPlaceDto } from './dto/create.worldPlace.dto';
import { WorldPlaces } from './worldPlaces.entity';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiOperation,
  ApiNoContentResponse,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateWorldPlaceDto } from './dto/update.worldPlace.dto';
import { WorldPlacesRepository } from './worldPlaces.repository';
import { ValidateUpdate } from './pipes/validateUpdate.pipe';
import { ValidateId } from './pipes/validateId.pipe';
import { ValidateDuplicate } from './pipes/validateDuplicate.pipe';

@Controller('worldPlaces')
export class WorldPlacesController extends BaseController {
  constructor(private readonly repository: WorldPlacesRepository) {
    super();
  }

  @ApiOperation({ summary: 'Create new world place' })
  @ApiBody({ type: CreateWorldPlaceDto })
  @ApiCreatedResponse({
    description: 'The world place has been successfully created',
  })
  @UsePipes(ValidateDuplicate)
  @Post()
  async create(
    @Body() createWorldPlaceDto: CreateWorldPlaceDto,
  ): Promise<WorldPlaces> {
    return this.repository.save(createWorldPlaceDto);
  }

  @ApiOperation({ summary: 'Update a world place' })
  @ApiParam({ name: 'id', type: 'number', description: 'World place Id (PK)' })
  @ApiBody({ type: CreateWorldPlaceDto })
  @ApiNoContentResponse({
    type: CreateWorldPlaceDto,
    description: 'The event has been successfully updated',
  })
  @UsePipes(ValidateUpdate, ValidateId)
  @HttpCode(204)
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorldPlaceDto: UpdateWorldPlaceDto,
  ): Promise<void | UpdateResult> {
    return this.repository.update(id, updateWorldPlaceDto);
  }

  @ApiOperation({ summary: 'Get all world places' })
  @ApiOkResponse({
    description: 'Here is all the world places',
  })
  @Get('/getAll')
  async getAll(): Promise<WorldPlaces[]> {
    return this.repository.find({
      order: {
        goal: 'DESC',
      },
    });
  }

  @ApiOperation({ summary: 'Get world place by Id' })
  @ApiParam({ name: 'id', type: 'number', description: 'World place Id (PK)' })
  @ApiOkResponse({
    description: 'Here is the world place',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<WorldPlaces> {
    return this.repository.findOne(id);
  }

  @ApiOperation({ summary: 'Delete world place by Id' })
  @ApiParam({ name: 'id', type: 'number', description: 'World place Id (PK)' })
  @ApiOkResponse({
    description: 'Success on delete world place',
  })
  @Delete('/:id')
  async deleteWorldPlace(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
