import { BusinessError } from '@/shared/domain';

export class PlaceAlreadyExistsError extends BusinessError {
  constructor() {
    super('Lugar já está cadastrado.');
  }
}
