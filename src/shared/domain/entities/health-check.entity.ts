import { ApiProperty } from '@nestjs/swagger';

export class HealthCheck {
  @ApiProperty()
  public uptime: number;

  @ApiProperty()
  public env: string;
}
