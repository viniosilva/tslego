import { ServerResponse } from 'http';
import pinoHttp from 'pino-http';
import { logger } from './logger';

export function customLogLevel(res: ServerResponse, err: Error) {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  else if (res.statusCode >= 500 || err) return 'error';
  return 'info';
}

export const httpLogger = pinoHttp({
  logger,
  customLogLevel,
});

// Ref: https://www.npmjs.com/package/pino-http
