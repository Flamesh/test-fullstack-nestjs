import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  ISBN: number;
}

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  ISBN: number;
}
