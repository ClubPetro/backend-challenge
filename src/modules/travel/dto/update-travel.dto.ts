import { IsString } from 'class-validator';

export class UpdateTravelDTO {
  @IsString()
  locale?: string;

  @IsString()
  goal?: string;

  updatedAt?: Date;
  userId?: number;
}
