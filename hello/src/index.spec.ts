import { hello } from './';

describe('Hello', () => {
  describe('getMessage', () => {
    it('should return string message', () => {
      const message = hello.getMessage();
      expect(message).toEqual('Hello world! (:');
    });
  });
});
