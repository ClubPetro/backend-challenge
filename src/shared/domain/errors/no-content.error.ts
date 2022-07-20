import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContentError extends HttpException {
  constructor() {
    super('Sem conteúdo.', HttpStatus.NO_CONTENT);
    this.name = 'NoContentError';
  }
}
