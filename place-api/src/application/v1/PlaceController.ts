import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger'
import { CreatePlaceDTO } from '../../domain/dto/CreatePlaceDTO'
import { UpdatePlaceDTO } from '../../domain/dto/UpdatePlaceDTO'
import { Place } from '../../domain/model/Place'
import PlaceService from '../../service/PlaceService'

@Controller('api/v1/places')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Get()
    @ApiOperation({ summary: 'Get all places' })
    @ApiOkResponse({ description: 'Return list of all places' })
    async getAll(): Promise<Place[]> {
        return this.placeService.getAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get place by id' })
    @ApiOkResponse({ description: 'Success in looking for place' })
    @ApiNotFoundResponse({ description: 'Place not found for id' })
    async findById(@Param('id') id: string): Promise<Place> {
        return this.placeService.findByPlaceById(id)
    }

    @Post('save')
    @ApiOperation({ summary: 'Create a place' })
    @ApiCreatedResponse({ description: 'Record created successfully!' })
    @ApiBadRequestResponse({
        description:
            'An invalid date or a date older than the current one was informed',
    })
    @ApiConflictResponse({ description: 'Place already registered!' })
    @ApiBody({ type: CreatePlaceDTO })
    async savePlace(@Body() payload: CreatePlaceDTO): Promise<Place> {
        return this.placeService.executeSave(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update place' })
    @ApiBody({ type: UpdatePlaceDTO })
    @ApiOkResponse({ description: 'Sucessfully update place' })
    @ApiNotFoundResponse({ description: 'No place found for the given id' })
    @ApiConflictResponse({ description: 'The place already exists!' })
    @ApiBadRequestResponse({
        description:
            'An invalid date or a date older than the current one was informed',
    })
    async update(
        @Param('id') id: string,
        @Body() placeUpdated: UpdatePlaceDTO,
    ): Promise<Place> {
        return this.placeService.executeUpdate(id, placeUpdated)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a place by its id' })
    @ApiNotFoundResponse({ description: 'No location found for id!' })
    @ApiOkResponse({ description: 'Place successfully deleted!' })
    async delete(@Param('id') id: string): Promise<Place> {
        return this.placeService.deleteById(id)
    }
}
