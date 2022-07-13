export class UnprocessableEntityError extends Error {
  constructor() {
    super('Erro ao processar registro.');
    this.name = 'UnprocessableEntityError';
  }
}
