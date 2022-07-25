import { ApiProperty } from '@nestjs/swagger';

import { TextLengthNotSatisfied } from '@core/exception/exception.types';
import {
  Length,
  ValidationArguments,
  IsDateString,
  Equals,
  IsOptional,
} from 'class-validator';

export class UpdatePartialPlaceDTO {
  @Equals(undefined)
  @IsOptional()
  country?: string;

  @ApiProperty()
  @Length(2, 200, {
    message: (args: ValidationArguments) => {
      throw new TextLengthNotSatisfied(
        args.property,
        args.constraints[0],
        args.constraints[1],
      );
    },
  })
  location: string;

  @ApiProperty()
  @IsDateString()
  goal: Date;

  @Equals(undefined)
  @IsOptional()
  imageUrl?: string;
}
