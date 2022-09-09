import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdatePostDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  readonly headline?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(20)
  readonly content?: string
}
