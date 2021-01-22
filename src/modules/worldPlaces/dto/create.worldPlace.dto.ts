import { IsNotEmpty, IsUrl, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorldPlaceDto {
  @ApiProperty({ type: 'string', example: 'Brazil' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: 'string',
    example:
      'https://oimparcial.com.br/app/uploads/2019/11/qual-a-origem-do-ordem-e-progresso-na-bandeira-do-brasil-og.jpg',
  })
  @IsNotEmpty()
  @IsUrl()
  flagUrl: string;

  @ApiProperty({ type: 'string', example: 'São Paulo' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: 'string', example: '1999-01-08 04:05:06' })
  @IsNotEmpty()
  goal: string;
}
