import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max, IsInt } from 'class-validator';
const anoAtual = new Date().getFullYear(); //Variável para armazenar o ano atual visto que não é possível se adicionar uma meta para o passado :)

export class UpdateLugaresDto{
    @ApiProperty({ example: 'Disney World', description: 'O local desejado para ir', type: String })
    @IsString()
    local: string;

    @ApiProperty({ example: 10, description: 'Mês da meta', type: Number, minimum: 1, maximum: 12 })
    @IsInt()
    @Min(1)
    @Max(12)
    mes: number;

    @ApiProperty({ example: 2030, description: 'Ano da meta', type: Number, minimum: 2021  })
    @IsInt()
    @Min(anoAtual)
    ano: number;
}