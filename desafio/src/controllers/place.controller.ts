import { Controller, Get, Post } from '@nestjs/common';
import { PlaceService } from 'src/services/place.service';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}
  @Post()
  store() {}
  @Get()
  findAll() {}
}
