import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { TravelsService } from './travels.service';
import { Travel, CreateTravelDto, UpdateTravelDto } from './travel.entity';

@ApiTags('Travels')
@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  @ApiCreatedResponse({ type: [Travel] })
  async get(): Promise<Travel[]> {
    return await this.travelsService.get();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: Travel })
  async getOne(@Param('id') id: string): Promise<Travel> {
    return await this.travelsService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateTravelDto): Promise<void> {
    return await this.travelsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTravelDto,
  ): Promise<void> {
    return await this.travelsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.travelsService.delete(id);
  }
}
