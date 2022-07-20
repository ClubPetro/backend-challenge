import { BusinessError } from '@/shared/domain';

export class CreatePlaceError extends BusinessError {
  constructor() {
    super('Erro ao criar lugar.');
  }
}
