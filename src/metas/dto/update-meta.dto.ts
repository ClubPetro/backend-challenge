import { IsDateString, IsOptional } from 'class-validator';

export class UpdateMetaDto {
  @IsDateString()
  @IsOptional()
  date?: Date;
}
