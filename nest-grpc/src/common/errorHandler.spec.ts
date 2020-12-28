import { errorHandler } from './errorHandler';
import { NotFoundException } from './exception/NotFoundException';

describe('common', () => {
  describe('errorHandler', () => {
    it('should throw not found', () => {
      const fn = () => errorHandler(new NotFoundException('NOT_FOUND'));
      expect(fn).toThrowErrorMatchingSnapshot();
    });

    it('should throw internal server error', () => {
      const fn = () => errorHandler(new Error('INTERNAL SERVER ERROR'));
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
});
