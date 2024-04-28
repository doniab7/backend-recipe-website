import { IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
