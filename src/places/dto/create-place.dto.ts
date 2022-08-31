import { IsNumber, IsString } from 'class-validator';

export class CreatePlaceDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly goal: string;

    @IsNumber()
    readonly country_id: number;
}
