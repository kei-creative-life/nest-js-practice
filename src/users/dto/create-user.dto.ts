import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(15)
  @IsNotEmpty()
  name: string;
}
