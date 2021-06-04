import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsUrl, isURL, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlacesDto {
  @ApiProperty({ description: 'Country you want to visit.' })
  @IsNotEmpty()
  country: string;
  @ApiProperty({ description: 'Place you want to visit.' })
  @IsNotEmpty()
  place: string;
  @ApiProperty({ description: 'Goal for visit this place. Valid formart ( dd/mm/yyyy , mm/yyyy, dd-mm-yyyy , mm-yyyy ) ', examples: ['25/07/2021', '07/2021', '25-07-2021', '07-2021'] }
  )
  @IsNotEmpty()
  goal: string;

}