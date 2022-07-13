import { SystemError } from '@/shared/domain';

export class PlaceNotFoundError extends SystemError {
  constructor() {
    super('Lugar não foi encontrado.');
  }
}
