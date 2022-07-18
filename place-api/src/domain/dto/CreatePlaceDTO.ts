import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl, IsNotEmpty, IsDateString } from 'class-validator'

export class CreatePlaceDTO {
    @ApiProperty({
        example: 'Portugal',
        description: 'Country you want to know',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    country: string

    @ApiProperty({
        example: 'Sintra Castle',
        description: 'The location within the chosen country',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    place: string

    @ApiProperty({
        description:
            'The month and year the user intends to visit the location',
        example: '2022-7',
    })
    @IsNotEmpty()
    goal: string

    @ApiProperty({
        example:
            'https://pt.wikipedia.org/wiki/Bandeira_de_Portugal#/media/Ficheiro:Flag_of_Portugal.svg',
        description: 'Country flag url',
        type: String,
    })
    @IsNotEmpty()
    @IsUrl()
    urlFlag?: string

    @ApiProperty({
        example: '2022-07-15T16:08:24.749+00:00',
        description: 'Registration date',
        type: Date,
    })
    @IsNotEmpty()
    @IsDateString()
    registerDate?: Date = null

    @ApiProperty({
        example: '2022-07-15T16:08:24.749+00:00',
        description: 'Last modified date',
        type: Date,
    })
    @IsNotEmpty()
    @IsDateString()
    lastModifyDate?: Date = null
}
