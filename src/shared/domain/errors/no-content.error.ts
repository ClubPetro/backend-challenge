export class NoContentError extends Error {
  constructor() {
    super('Sem conteúdo.');
    this.name = 'NoContentError';
  }
}
