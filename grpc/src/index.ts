import { apiConfig } from './common/config';
import { logger } from './common/logger';
import { Server } from './Server';
import { userHandler } from './user';

const handlers = [userHandler];

const server = new Server(apiConfig.host, apiConfig.port, handlers, logger);
server.start();
