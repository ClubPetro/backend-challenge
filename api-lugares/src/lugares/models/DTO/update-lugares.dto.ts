import { IsString, Min, Max, IsInt } from 'class-validator';
const anoAtual = new Date().getFullYear(); //Variável para armazenar o ano atual visto que não é possível se adicionar uma meta para o passado :)

export class UpdateLugaresDto{
    @IsString()
    local: string;

    @IsInt()
    @Min(1)
    @Max(12)
    mes: number;

    @IsInt()
    @Min(anoAtual)
    ano: number;
}