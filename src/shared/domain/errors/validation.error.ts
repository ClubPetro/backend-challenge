export class ValidationError extends Error {
  constructor(
    private readonly param: string,
    private readonly errorMessage: string,
  ) {
    super(errorMessage);
    this.name = this.constructor.name;
  }
}
