export class ServiceUnavailableError extends Error {
  constructor() {
    super('Servidor não disponível.');
    this.name = 'ServiceUnavailableError';
  }
}
