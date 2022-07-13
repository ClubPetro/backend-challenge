import { SystemError } from '@/shared/domain';

export class CreatePlaceError extends SystemError {
  constructor() {
    super('Erro ao criar lugar.');
  }
}
