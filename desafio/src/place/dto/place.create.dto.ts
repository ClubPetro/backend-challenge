import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUrl } from 'class-validator';

export class PlaceCreateDto {
  @IsString()
  @ApiProperty({
    example: 'Brasil',
    description: 'Digite aqui o país da sua meta',
    type: String,
  })
  country: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png',
    description: 'Link/Url para a bandeira do país',
    type: String,
  })
  url: string;

  @IsString()
  @ApiProperty({
    example: 'Cataratas do Iguaçu ',
    description: 'Coloque aqui o local/atração que você queira ir',
    type: String,
  })
  location: string;

  @IsDateString({ strict: true })
  @ApiProperty({
    example: '2025-05',
    description: 'Digite aqui a meta, ano-mês',
  })
  meta: string;
}
