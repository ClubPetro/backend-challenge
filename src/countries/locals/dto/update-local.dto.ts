import { IsNumber, IsString } from 'class-validator';

import Country from '../../country.entity';

export class UpdateLocalDto {
  @IsString()
  name?: string;

  @IsNumber()
  countryId?: Country;
}
