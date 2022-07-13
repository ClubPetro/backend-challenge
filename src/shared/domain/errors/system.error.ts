export class SystemError extends Error {
  constructor(public errorMessage: string = 'Erro inesperado.') {
    super(errorMessage);
    this.name = this.constructor.name;
  }
}
