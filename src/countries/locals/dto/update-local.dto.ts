import { IsNumber, IsString, IsOptional } from 'class-validator';

import Country from '../../country.entity';

export class UpdateLocalDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  countryId?: Country;
}
