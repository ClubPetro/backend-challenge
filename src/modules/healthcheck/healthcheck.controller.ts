import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Healthcheck')
export class HealthcheckController {
  @Get('/')
  async home() {
    return;
  }

  @Get('/healthcheck')
  async healthCheck() {
    return;
  }

  @Get('/status')
  async status() {
    return;
  }
}
