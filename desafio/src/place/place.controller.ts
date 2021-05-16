import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PlaceService } from 'src/place/place.service';
import { PlaceCreateDto } from './dto/place.create.dto';
import { PlaceUpdateDto } from './dto/place.update.dto';
import { Place } from './places.entity';

@Controller('lugar')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('cadastrar')
  async create(@Body() data: PlaceCreateDto): Promise<Place> {
    return await this.placeService.create(data);
  }

  @Get('listar')
  async findAll(): Promise<Place[]> {
    return await this.placeService.getAll();
  }

  @Get('listar/:id')
  async findOne(@Param() id: string): Promise<Place> {
    return await this.placeService.getById(id);
  }

  @Put('atualizar/:id')
  async update(
    @Param() id: string,
    @Body() data: PlaceUpdateDto,
  ): Promise<Place> {
    return await this.placeService.update(id, data);
  }
}
