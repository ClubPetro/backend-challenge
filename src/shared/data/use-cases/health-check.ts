import { HealthCheck as HealthCheckEntity } from '@/shared/domain';

export class HealthCheck {
  execute(): HealthCheckEntity {
    return {
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
    };
  }
}
