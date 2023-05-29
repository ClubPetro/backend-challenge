import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateObjectiveDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  goalPlace?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  goalDate: string;
}
