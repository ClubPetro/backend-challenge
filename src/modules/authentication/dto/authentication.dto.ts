import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
