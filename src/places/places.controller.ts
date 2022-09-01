import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createPlaceDto: CreatePlaceDto) {
        return this.placesService.create(createPlaceDto);
    }

    @Get()
    findAll() {
        return this.placesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.placesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
        return this.placesService.update(id, updatePlaceDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.placesService.remove(id);
    }
}
