import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
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
}
