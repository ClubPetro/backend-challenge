export class UnauthorizedError extends Error {
  constructor(private readonly errorMessage = 'Acesso negado.') {
    super(errorMessage);
    this.name = this.constructor.name;
  }
}
