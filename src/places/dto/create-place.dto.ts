import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePlaceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: `Name of place to visit`,
        example: 'Fortaleza',
    })
    readonly name: string;

    @Matches(/(0[1-9]|1[0-2])\/(20([2-9][2-9]|[3-9][0-9])|2[1-9][0-9][0-9])/, {
        message: 'goal must be a valid date like 01/2023',
    })
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: `Date to visit a place`,
        example: '01/2023',
    })
    goal: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: `Country of place (should exists in database)`,
        example: 'Brazil',
    })
    readonly country: string;
}
