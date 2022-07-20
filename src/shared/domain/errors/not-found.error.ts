import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(message = 'Registro não encontrado.') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}
