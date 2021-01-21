import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  ArgumentMetadata,
} from '@nestjs/common';
import { UpdateWorldPlaceDto } from '../dto/update.worldPlace.dto';

@Injectable()
export class ValidateUpdate implements PipeTransform {
  async transform(
    value: UpdateWorldPlaceDto,
    metadata: ArgumentMetadata,
  ): Promise<UpdateWorldPlaceDto | void> {
    if (metadata.type !== 'body') return value;
    const keys = Object.keys(value);
    const validKeys = ['goal', 'location'];
    const valid = !keys.some((x) => !validKeys.includes(x));
    if (!valid)
      throw new UnprocessableEntityException(
        'The request must have only the fields: goal and location.',
      );
    return value;
  }
}
