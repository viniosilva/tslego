import { BadRequestException } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { User, UserRequest, UserRequestId } from './dto/User';
import { NotFoundException } from '../common/exception/NotFoundException';

export class UserService {
  private readonly users: User[] = [];

  validateUser(data: User) {
    const user = new User();
    user.id = data.id;
    user.name = data.name;

    this.validate(user);
  }

  validateUserRequest(data: UserRequest) {
    const user = new UserRequest();
    user.name = data.name;

    this.validate(user);
  }

  validateUserRequestId(data: UserRequestId) {
    const user = new UserRequestId();
    user.id = data.id;

    this.validate(user);
  }

  private validate(object: any) {
    const errors = validateSync(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors.join('; '));
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: number): User {
    const user = this.users.find(({ id }) => id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(userRequest: UserRequest): User {
    const user = new User();
    user.id = this.users.length + 1;
    user.name = userRequest.name;

    this.users.push(user);
    return user;
  }

  updateUserById(userId: number, userRequest: UserRequest): User {
    const user = this.getUserById(userId);
    user.name = userRequest.name;
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
}
