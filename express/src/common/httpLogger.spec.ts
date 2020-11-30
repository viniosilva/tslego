import { ServerResponse } from 'http';
import { customLogLevel } from './httpLogger';

describe('loggerHttp', () => {
  describe('customLogLevel', () => {
    it('should return info level', () => {
      const res = { statusCode: 200 } as ServerResponse;
      const logLevel = customLogLevel(res, null);

      expect(logLevel).toEqual('info');
    });

    it('should return warn level', () => {
      const res = { statusCode: 400 } as ServerResponse;
      const logLevel = customLogLevel(res, null);

      expect(logLevel).toEqual('warn');
    });

    it('should return error level', () => {
      const res = { statusCode: 500 } as ServerResponse;
      const logLevel = customLogLevel(res, null);

      expect(logLevel).toEqual('error');
    });

    it('should return error level when error exists', () => {
      const res = { statusCode: 200 } as ServerResponse;
      const logLevel = customLogLevel(res, new Error());

      expect(logLevel).toEqual('error');
    });
  });
});
