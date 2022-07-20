import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAcceptableError extends HttpException {
  constructor() {
    super('Dados não aceitos.', HttpStatus.NOT_ACCEPTABLE);
    this.name = 'NotAcceptableError';
  }
}
