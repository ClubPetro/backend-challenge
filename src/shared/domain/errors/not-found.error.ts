export class NotFoundError extends Error {
  constructor() {
    super('Registro não encontrado.');
    this.name = 'NotFoundError';
  }
}
