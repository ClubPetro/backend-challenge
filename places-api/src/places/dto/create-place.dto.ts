import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max, IsUrl, IsInt } from 'class-validator';
export class CreatePlaceDto {
    @ApiProperty({ example: 'Brazil', description: 'Name of the country.', type: String })
    @IsString()
    country_name: string;

    @ApiProperty({ example: 'São-Paulo', description: 'Name of the country part.', type: String })
    @IsString()
    country_part: string;

    @ApiProperty({ example: 3, description: 'Month.', type: Number, minimum: 1, maximum: 12 })
    @Min(1)
    @Max(12)
    @IsInt()
    month: number;

    @ApiProperty({ example: 2022, description: 'Year', type: Number, minimum: 0 })
    @IsInt()
    @Min(0)
    year: number;

    @ApiProperty({ example: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png', description: 'Link to the image representing the country.', type: String })
    @IsUrl()
    image_url: string;
}