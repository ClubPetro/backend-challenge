import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(
    PickType(CreatePlaceDto, ['name', 'goal'] as const),
) {}
