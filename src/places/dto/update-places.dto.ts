import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
export class UpdatePlacesDto {
  @ApiProperty({ description: 'Place you want to visit.' })
  @IsOptional()
  place?: string;
  @ApiProperty({ description: 'Goal for visit this place. Valid formart ( dd/mm/yyyy , mm/yyyy, dd-mm-yyyy , mm-yyyy ) ' }
  )
  @IsOptional()
  goal?: string;
}