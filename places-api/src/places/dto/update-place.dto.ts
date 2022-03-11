import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max, IsInt } from 'class-validator';
export class UpdatePlaceDto {
    @ApiProperty({ example: 'Curitiba', description: 'Name of the country part.', type: String })
    @IsString()
    country_part: string;

    @ApiProperty({ example: 10, description: 'Month.', type: Number, minimum: 1, maximum: 12 })
    @IsInt()
    @Min(1)
    @Max(12)
    month: number;

    @ApiProperty({ example: 2030, description: 'Year.', type: Number, minimum: 0 })
    @IsInt()
    @Min(0)
    year: number;
}