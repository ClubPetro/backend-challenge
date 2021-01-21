import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WorldPlacesRepository } from '../worldPlaces.repository';
import { WorldPlaces } from '../worldPlaces.entity';

@Injectable()
export class ValidateDuplicate implements PipeTransform {
  constructor(private readonly repository: WorldPlacesRepository) {}
  async transform(
    value: Partial<WorldPlaces>,
    metadata: ArgumentMetadata,
  ): Promise<Partial<WorldPlaces> | void> {
    if (metadata.type !== 'body') return value;
    const { location, country } = value;
    const invalid = await this.repository.count({ location, country });

    if (invalid)
      throw new UnprocessableEntityException(
        `The location: ${location} is already registered for the country: ${country}.`,
      );
    return value;
  }
}
