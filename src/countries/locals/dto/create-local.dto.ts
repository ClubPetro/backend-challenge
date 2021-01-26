import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import Country from '../../country.entity';

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  countryId: Country;
}
