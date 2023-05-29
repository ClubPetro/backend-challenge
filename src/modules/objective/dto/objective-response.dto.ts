import { ApiProperty } from '@nestjs/swagger';

export class ObjectiveResponseDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  goalPlace: string;

  @ApiProperty()
  goalDate: Date;
}

export class ObjectiveResponseDto {
  @ApiProperty({ type: ObjectiveResponseDataDto, isArray: true })
  data: ObjectiveResponseDataDto[];

  @ApiProperty()
  numberTotalPage: number;
}
