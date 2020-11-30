import { UserController } from './UserController';
import { UserService } from './UserService';

const userService = new UserService();
export const userController = new UserController(userService);
