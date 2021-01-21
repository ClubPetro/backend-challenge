import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorldPlaceDto {
  @ApiProperty({ type: 'string', example: 'São Paulo' })
  @IsOptional()
  location: string;

  @ApiProperty({ type: 'string', example: '1999-01-08 04:05:06' })
  @IsOptional()
  goal: string;
}
