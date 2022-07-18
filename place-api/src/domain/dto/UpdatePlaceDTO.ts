import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePlaceDTO {
    @ApiProperty({ description: 'Country you want to know.' })
    @IsNotEmpty()
    country: string

    @ApiProperty({ description: 'The location within the chosen country.' })
    @IsNotEmpty()
    place: string

    @ApiProperty({
        description:
            'The month and year the user intends to visit the location. ',
        example: '14/07/2022',
    })
    @IsNotEmpty()
    goal: string

    urlFlag?: string
    registerDate?: Date = null
    lastModifyDate?: Date = null
}
