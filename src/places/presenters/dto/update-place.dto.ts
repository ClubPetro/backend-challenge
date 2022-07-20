import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UpdatePlace } from '@/places/data';

export class UpdatePlaceDto implements UpdatePlace.Data {
  @IsOptional()
  @ApiProperty({
    title: 'Local que o usuário pretende visitar',
  })
  local: string;

  @IsOptional()
  @ApiProperty({
    title: 'Data que o usuário pretende visitar o lugar',
    type: Date,
  })
  expectedVisitAt: Date;
}
