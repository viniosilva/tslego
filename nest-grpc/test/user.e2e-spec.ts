import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/AppModule';
import { Response } from '../src/dto/Response';
import { UserHandler } from '../src/user/UserHandler';
import { Metadata, ServerUnaryCall } from 'grpc';

describe('AppController (e2e)', () => {
  const metadata = new Metadata();
  const call = {} as ServerUnaryCall<Response>;
  let userHandler: UserHandler;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userHandler = moduleFixture.get<UserHandler>(UserHandler);
  });

  describe('getUsers', () => {
    it('should return empty user list', () => {
      const res = userHandler.getUsers({}, metadata, call);
      expect(res).toMatchSnapshot();
    });

    it('should return user list', async () => {
      userHandler.createUser({ name: 'TEST' }, metadata, call);

      const res = userHandler.getUsers({}, metadata, call);
      expect(res).toMatchSnapshot();
    });
  });

  describe('getUserById', () => {
    it('should return user', async () => {
      const { data } = userHandler.createUser({ name: 'TEST' }, metadata, call);

      const res = userHandler.getUserById({ id: data.id }, metadata, call);
      expect(res).toMatchSnapshot();
    });

    it('should throw not found exception', () => {
      const fn = () => userHandler.getUserById({ id: 0 }, metadata, call);
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });

  describe('createUser', () => {
    it('should return new user', () => {
      const res = userHandler.createUser({ name: 'TEST' }, metadata, call);
      expect(res).toMatchSnapshot();
    });

    it('should throw bad request exception', () => {
      const fn = () => userHandler.createUser({ name: 'T' }, metadata, call);
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });

  describe('updateUserById', () => {
    it('should return updated user', async () => {
      const { data } = userHandler.createUser({ name: 'TEST' }, metadata, call);

      const res = userHandler.updateUserById(
        { id: data.id, name: 'UPDATE TEST' },
        metadata,
        call,
      );

      expect(res).toMatchSnapshot();
    });

    it('should throw bad request exception', () => {
      const { data } = userHandler.createUser({ name: 'TEST' }, metadata, call);

      const fn = () =>
        userHandler.updateUserById({ id: data.id, name: 'T' }, metadata, call);

      expect(fn).toThrowErrorMatchingSnapshot();
    });

    it('should throw not found exception', () => {
      const fn = () =>
        userHandler.updateUserById({ id: 0, name: 'TEST' }, metadata, call);

      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });

  describe('removeUserById', () => {
    it('should remove user', async () => {
      const { data } = userHandler.createUser({ name: 'TEST' }, metadata, call);
      const res = userHandler.removeUserById({ id: data.id }, metadata, call);

      expect(res).toMatchSnapshot();
    });
  });
});
