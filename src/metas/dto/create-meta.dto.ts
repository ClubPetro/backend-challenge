import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

import Local from '../../countries/locals/local.entity';

export class CreateMetaDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  localId: Local;
}
