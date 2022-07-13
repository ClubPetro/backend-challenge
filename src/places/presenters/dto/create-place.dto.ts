import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreatePlace } from '@/places/data';

export class CreatePlaceDto implements CreatePlace.Data {
  @IsNotEmpty({ message: "Parâmetro 'country' é obrigatório." })
  @ApiProperty({
    title: 'País que o usuário pretende visitar',
  })
  country: string;

  @IsNotEmpty({ message: "Parâmetro 'local' é obrigatório." })
  @ApiProperty({ title: 'Local que o usuário pretende visitar' })
  local: string;

  @IsNotEmpty({ message: "Parâmetro 'expectedVisitAt' é obrigatório." })
  @ApiProperty({
    title: 'Data que o usuário pretende visitar o lugar',
    type: Date,
  })
  expectedVisitAt: Date;

  @IsNotEmpty({ message: "Parâmetro 'flagUrl' é obrigatório." })
  @ApiProperty({
    title: 'Url da bandeira do país que o usuário pretende visitar',
  })
  flagUrl: string;
}
