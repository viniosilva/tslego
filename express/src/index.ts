import { apiConfig } from './common/config';
import { logger } from './common/logger';
import { Server } from './server';
import { userController } from './user';

const routes = [userController.router];
const server = new Server(
  apiConfig.host,
  apiConfig.port,
  logger,
  apiConfig.swaggerConfig,
  routes,
);

server.start();
