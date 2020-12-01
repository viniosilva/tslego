import Joi from 'joi';
import { User, UserInput } from './dto/User';
import { NotFoundException } from './exception/NotFoundException';

export class UserService {
  private readonly users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: number): User {
    const user = this.users.find(({ id }) => id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(userInput: UserInput): User {
    const user = new User();
    user.id = this.users.length + 1;
    user.name = userInput.name;

    this.users.push(user);
    return user;
  }

  updateUserById(userId: number, userInput: UserInput): User {
    const user = this.getUserById(userId);
    user.name = userInput.name;
    return user;
  }

  removeUserById(userId: number): void {
    let indexOf: number;
    this.users.some((user, index) => {
      if (user.id === userId) {
        indexOf = index;
        return true;
      }
    });

    if (!isNaN(indexOf)) this.users.splice(indexOf, 1);
  }

  validateUserInput(userInput: UserInput): void {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
    });
    const { error } = schema.validate(userInput);
    if (error)
      throw new Error(error.details.map(({ message }) => message).join(', '));
  }
}
