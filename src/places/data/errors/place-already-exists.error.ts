import { SystemError } from '@/shared/domain';

export class PlaceAlreadyExistsError extends SystemError {
  constructor() {
    super('Lugar já está cadastrado.');
  }
}
