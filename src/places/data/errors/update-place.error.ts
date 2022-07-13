import { SystemError } from '@/shared/domain';

export class UpdatePlaceError extends SystemError {
  constructor() {
    super('Erro ao atualizar lugar.');
  }
}
