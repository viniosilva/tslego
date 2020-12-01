import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

const nameExample = 'Firstname Lastname';
export class User {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: nameExample })
  name: string;
}

export class UserInput {
  @ApiProperty({ example: nameExample })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  readonly name: string;
}
