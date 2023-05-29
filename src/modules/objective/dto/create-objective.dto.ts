import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateObjectiveDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  goalPlace: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  goalDate: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  countryId: string;
}
