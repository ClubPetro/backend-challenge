import { BusinessError } from '@/shared/domain';

export class UpdatePlaceError extends BusinessError {
  constructor() {
    super('Erro ao atualizar lugar.');
  }
}
