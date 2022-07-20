import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor(
    private readonly param: string,
    private readonly errorMessage: string,
  ) {
    super(errorMessage, HttpStatus.BAD_REQUEST);
    this.name = this.constructor.name;
  }
}
