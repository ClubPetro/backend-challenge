import { IsString } from 'class-validator';

export class CreatePlaceDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly goal: string;

    @IsString()
    readonly country: string;
}
