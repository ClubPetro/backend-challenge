import { IsDateString, IsString, IsUrl } from 'class-validator';

export class PlaceCreateDto {
  @IsString()
  country: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  location: string;

  @IsDateString({ strict: true })
  meta: string;
}
