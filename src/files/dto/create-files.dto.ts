import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
}
