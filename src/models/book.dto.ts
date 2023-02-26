import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
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
