import { IsString, IsOptional } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  auth: string;

  @IsString()
  ISBN: number;
}

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  auth: string;

  @IsString()
  @IsOptional()
  ISBN: string;
}
