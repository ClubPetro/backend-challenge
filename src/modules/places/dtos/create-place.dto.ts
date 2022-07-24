import { ApiProperty } from '@nestjs/swagger';

import { TextLengthNotSatisfied } from '@core/exception/exception.types';
import {
  Length,
  ValidationArguments,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreatePlaceDTO {
  @ApiProperty()
  // @IsNotEmpty({
  //   message: (args: ValidationArguments) => {
  //     throw new FieldIsRequired(args.property);
  //   },
  // })
  @Length(2, 200, {
    message: (args: ValidationArguments) => {
      throw new TextLengthNotSatisfied(
        args.property,
        args.constraints[0],
        args.constraints[1],
      );
    },
  })
  country: string;

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

  @ApiProperty()
  @IsUrl()
  @Length(2, 200, {
    message: (args: ValidationArguments) => {
      throw new TextLengthNotSatisfied(
        args.property,
        args.constraints[0],
        args.constraints[1],
      );
    },
  })
  imageUrl: string;
}
