import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import File from '../../files/file.entity';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  fileId: File;
}
