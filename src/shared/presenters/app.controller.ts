import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HealthCheck } from '@/shared/data';
import { HealthCheck as HealthCheckEntity } from '@/shared/domain';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Health Check Application' })
  @ApiOkResponse({
    description: 'The object of record found: HealthCheck.',
    type: HealthCheckEntity,
  })
  @Get('healthcheck')
  healthcheck(): HealthCheckEntity {
    return new HealthCheck().execute();
  }
}
