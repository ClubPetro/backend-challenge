import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import Local from './local.entity';
import { LocalsService } from './locals.service';

@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @Post()
  create(@Body() createLocalDto: CreateLocalDto): Promise<Local> {
    const local = this.localsService.create(createLocalDto);
    return local;
  }

  @Get()
  findAll(): Promise<Local[]> {
    return this.localsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Local> {
    return this.localsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalDto: UpdateLocalDto,
  ): Promise<Local> {
    return this.localsService.update(id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.localsService.remove(id);
  }
}
