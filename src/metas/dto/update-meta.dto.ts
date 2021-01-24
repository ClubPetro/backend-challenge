import { IsNumber, IsDateString, IsOptional } from 'class-validator';

import Local from '../../countries/locals/local.entity';

export class UpdateMetaDto {
  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsNumber()
  @IsOptional()
  localId?: Local;
}
