import { SystemError } from '@/shared/domain';

export class DeletePlaceError extends SystemError {
  constructor() {
    super('Erro ao deletar lugar.');
  }
}
