import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class User {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

export class UserRequestId {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
