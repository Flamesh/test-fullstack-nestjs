import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export interface AuthPayLoad {
  email: string;
}
