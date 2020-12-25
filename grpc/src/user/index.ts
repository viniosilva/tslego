import { logger } from '../common/logger';
import { UserHandler } from './UserHandler';
import { UserService } from './UserService';

const userService = new UserService();

export const userHandler = new UserHandler(userService, logger);
