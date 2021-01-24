import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MetasService } from './metas.service';

import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import Meta from './meta.entity';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Post()
  create(@Body() createMetaDto: CreateMetaDto): Promise<Meta> {
    const meta = this.metasService.create(createMetaDto);
    return meta;
  }

  @Get()
  findAll(): Promise<Meta[]> {
    return this.metasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Meta> {
    return this.metasService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.metasService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMetaDto: UpdateMetaDto,
  ): Promise<Meta> {
    return this.metasService.update(id, updateMetaDto);
  }
}
