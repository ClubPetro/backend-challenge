import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max, IsUrl, IsInt } from 'class-validator';
const anoAtual = new Date().getFullYear(); //Variável para armazenar o ano atual visto que não é possível se adicionar uma meta para o passado :)

export class CreateLugaresDto{
    @ApiProperty({ example: 'Canadá', description: 'O nome de um país para a meta', type: String })
    @IsString()
    nomePais: string;

    @ApiProperty({ example: 'Toronto', description: 'O local desejado para ir', type: String })
    @IsString()
    local: string;

    @ApiProperty({ example: 4, description: 'Mês da meta', type: Number, minimum: 1, maximum: 12 })
    @Min(1)
    @Max(12)
    @IsInt()
    mes: number;

    @ApiProperty({ example: 2022, description: 'Ano da meta', type: Number, minimum: 2021  })
    @Min(anoAtual)
    @IsInt()
    ano: number;

    @ApiProperty({ example: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg', description: 'URL para a foto do país', type: String })
    @IsUrl()
    stringPhoto: string;
}