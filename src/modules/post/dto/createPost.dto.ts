import { Exclude } from 'class-transformer'
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { User } from 'src/entities/User.entity'

export class CreatePostDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  readonly headline: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  readonly content: string

  @Exclude()
  author: User
}
