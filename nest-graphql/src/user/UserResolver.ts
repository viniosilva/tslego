import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from './type/User';
import { UserService } from './UserService';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns) => [User])
  getUsers(): User[] {
    const users = this.userService.getUsers();
    return users;
  }

  @Query((_returns) => User)
  getUserById(@Args('id', { type: () => Int }) userId: number): User {
    const user = this.userService.getUserById(userId);
    return user;
  }

  @Mutation((_returns) => User)
  createUser(@Args('input') input: UserInput): User {
    const user = this.userService.createUser(input);
    return user;
  }

  @Mutation((_returns) => User)
  updateUserById(
    @Args('id', { type: () => Int }) userId: number,
    @Args('input') input: UserInput,
  ): User {
    const user = this.userService.updateUserById(userId, input);
    return user;
  }

  @Mutation((_returns) => Boolean)
  removeUserById(@Args('id', { type: () => Int }) userId: number): boolean {
    this.userService.removeUserById(userId);
    return true;
  }
}
