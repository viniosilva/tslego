import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ObjectType({ description: `User object` })
export class User {
  @Field((_type) => Int, { description: 'The ID of the user' })
  @IsNotEmpty()
  id: number;

  @Field({ description: 'The name of the user' })
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

@InputType({ description: `User input` })
export class UserInput {
  @Field({ description: 'The name of the user' })
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}
