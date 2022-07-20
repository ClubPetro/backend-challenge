import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(private readonly errorMessage = 'Acesso negado.') {
    super(errorMessage, HttpStatus.UNAUTHORIZED);
    this.name = this.constructor.name;
  }
}
