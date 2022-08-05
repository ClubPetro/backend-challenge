import { Controller, Get } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { Travel } from './travel.entity';

@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  async get(): Promise<Travel[]> {
    return await this.travelsService.get();
  }
}
