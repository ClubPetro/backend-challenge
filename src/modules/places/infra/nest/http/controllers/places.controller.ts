import {
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  Query,
  Param,
  Body,
  Patch,
  Delete,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

import { QueryPagination } from '@core/core.model';
import { QueryPaginationPipe } from '@core/pipes/query-pagination.pipe';

import {
  EntityGone,
  EntityNotFound,
  GenericException,
  PropertyDoesNotExist,
} from '@core/exception/exception.types';
import { ControllerDecorator } from '@core/decorators/controller.decorator';

import { Place } from '@modules/places/models/place.model';
import { CreatePlaceDTO } from '@modules/places/dtos/create-place.dto';
import { UpdatePartialPlaceDTO } from '@modules/places/dtos/update-partial-place.dto';

import { ListPlacesService } from '@modules/places/services/list-places.service';
import { GetPlaceByIdService } from '@modules/places/services/get-place-by-id.service';
import { CreatePlaceService } from '@modules/places/services/create-place.service';
import { UpdatePartialPlaceService } from '@modules/places/services/update-partial-place.service';
import { DeletePlaceService } from '@modules/places/services/delete-place.service';
import { PlaceGoneService } from '@modules/places/services/place-gone.service';
import { PlaceDuplicatedService } from '@modules/places/services/place-duplicated.service';

const queryPaginationDefault = {
  order: [
    {
      field: 'goal',
      order: 'ASC',
    },
  ],
};

@ControllerDecorator('places')
@UseInterceptors(CacheInterceptor)
export class PlacesController {
  constructor(
    private readonly listPlaces: ListPlacesService,
    private readonly getPlaceById: GetPlaceByIdService,
    private readonly createPlace: CreatePlaceService,
    private readonly updatePartialPlace: UpdatePartialPlaceService,
    private readonly deletePlace: DeletePlaceService,
    private readonly placeGone: PlaceGoneService,
    private readonly placeDuplicated: PlaceDuplicatedService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ type: QueryPagination<Place>, required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Informações de lugares',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Algumas informações solicitadas não são válidas',
    type: PropertyDoesNotExist,
  })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'Este lugar não estã presente em nosso sistema',
  //   type: EntityNotFound,
  // })
  // @ApiResponse({
  //   status: HttpStatus.GONE,
  //   description: 'O lugar foi deletado',
  //   type: EntityGone,
  // })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Algo de errado aconteceu',
    type: GenericException,
  })
  async show(
    @Query(new QueryPaginationPipe())
    queryPagination?: QueryPagination<Place>,
  ): Promise<Place[]> {
    return this.listPlaces.execute(queryPagination);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Informações do lugar',
    type: Place,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O "lugar" não existe em nosso sistema',
    type: EntityNotFound,
  })
  @ApiResponse({
    status: HttpStatus.GONE,
    description: 'Este lugar foi deletado',
    type: EntityGone,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Algo de errado aconteceu',
    type: GenericException,
  })
  async index(@Param('id') id: string): Promise<Place> {
    await this.placeGone.execute(id);
    return this.getPlaceById.execute(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Informações do lugar',
    type: Place,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Algo de errado aconteceu',
    type: GenericException,
  })
  async create(@Body() createPlaceDto: CreatePlaceDTO): Promise<Place> {
    await this.placeDuplicated.execute({
      country: createPlaceDto.country,
      location: createPlaceDto.location,
    });
    return this.createPlace.execute(createPlaceDto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Informações do lugar',
    type: Place,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O "lugar" não existe em nosso sistema',
    type: EntityNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Algo de errado aconteceu',
    type: GenericException,
  })
  async updatePartial(
    @Param('id') id: string,
    @Body() updatePartialPlaceDto: UpdatePartialPlaceDTO,
  ): Promise<Place> {
    await this.placeGone.execute(id);
    await this.placeDuplicated.execute({
      id,
      location: updatePartialPlaceDto.location,
    });
    return this.updatePartialPlace.execute({
      id,
      ...updatePartialPlaceDto,
    });
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lugar deletado',
    type: Place,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'O "lugar" não existe em nosso sistema',
    type: EntityNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Algo de errado aconteceu',
    type: GenericException,
  })
  async delete(@Param('id') id: string) {
    await this.placeGone.execute(id);
    return this.deletePlace.execute(id);
  }
}
