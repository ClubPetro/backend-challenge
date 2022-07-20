import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessError extends HttpException {
  constructor(private readonly errorMessage: string) {
    super(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    this.name = this.constructor.name;
  }
}
