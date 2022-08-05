import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { TravelsService } from './travels.service';
import { Travel } from './travel.entity';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  async get(): Promise<Travel[]> {
    return await this.travelsService.get();
  }

  @Get(':id')
  async getOne(@Param('id') id: any): Promise<Travel> {
    return await this.travelsService.getOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<void> {
    return await this.travelsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() data: any): Promise<void> {
    return await this.travelsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: any): Promise<void> {
    return await this.travelsService.delete(id);
  }
}
