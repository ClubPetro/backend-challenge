import { BusinessError } from '@/shared/domain';

export class PlaceNotFoundError extends BusinessError {
  constructor() {
    super('Lugar não foi encontrado.');
  }
}
