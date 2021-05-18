import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class PlaceUpdateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Disney',
    description: 'Digite aqui a para ser atualizada',
  })
  location?: string;

  @IsDateString({ strict: true })
  @IsOptional()
  @ApiPropertyOptional({
    example: '2030-02',
    description:
      'Digite aqui a data para ser alterada, seguindo o formato ano-mês',
    type: String,
  })
  meta?: string;
}
