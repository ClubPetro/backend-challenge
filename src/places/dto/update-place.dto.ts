import { PartialType, PickType } from '@nestjs/swagger';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(
    PickType(CreatePlaceDto, ['name', 'goal'] as const),
) {}
