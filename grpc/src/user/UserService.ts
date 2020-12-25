import { User, UserRequest } from './dto/User';
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
