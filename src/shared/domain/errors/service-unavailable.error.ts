import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceUnavailableError extends HttpException {
  constructor() {
    super('Servidor não disponível.', HttpStatus.SERVICE_UNAVAILABLE);
    this.name = 'ServiceUnavailableError';
  }
}
