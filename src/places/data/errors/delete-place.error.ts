import { BusinessError } from '@/shared/domain';

export class DeletePlaceError extends BusinessError {
  constructor() {
    super('Erro ao deletar lugar.');
  }
}
