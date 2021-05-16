import { IsDateString, IsOptional, IsString } from 'class-validator';

export class PlaceUpdateDto {
  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString({ strict: true })
  @IsOptional()
  meta?: string;
}
