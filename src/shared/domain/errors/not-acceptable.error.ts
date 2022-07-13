export class NotAcceptableError extends Error {
  constructor() {
    super('Dados não aceitos.');
    this.name = 'NotAcceptableError';
  }
}
