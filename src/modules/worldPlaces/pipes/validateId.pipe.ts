import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { WorldPlacesRepository } from '../worldPlaces.repository';

@Injectable()
export class ValidateId implements PipeTransform {
  constructor(private readonly repository: WorldPlacesRepository) {}
  async transform(
    value: number,
    metadata: ArgumentMetadata,
  ): Promise<number | void> {
    if (metadata.type !== 'param') return value;

    const valid = await this.repository.count({ id: value });

    if (!valid) throw new NotFoundException('This id is not valid.X');
    return value;
  }
}
