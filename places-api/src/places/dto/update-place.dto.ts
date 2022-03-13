import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, Max, IsInt, IsOptional } from 'class-validator';
export class UpdatePlaceDto {
    @ApiPropertyOptional({ example: 'Curitiba', description: 'Name of the country part.', type: String })
    @IsString()
    @IsOptional()
    country_part: string;

    @ApiPropertyOptional({ example: 10, description: 'Month.', type: Number, minimum: 1, maximum: 12 })
    @IsInt()
    @Min(1)
    @Max(12)
    @IsOptional()
    month: number;

    @ApiPropertyOptional({ example: 2030, description: 'Year.', type: Number, minimum: 0 })
    @IsInt()
    @Min(0)
    @IsOptional()
    year: number;
}