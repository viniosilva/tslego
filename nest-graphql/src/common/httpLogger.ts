import { ServerResponse } from 'http';
import { Options } from 'pino-http';

export function customLogLevel(res: ServerResponse, err: Error) {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  else if (res.statusCode >= 500 || err) return 'error';
  return 'info';
}

export const httpLogger: Options = { customLogLevel };

// Ref: https://www.npmjs.com/package/pino-http
