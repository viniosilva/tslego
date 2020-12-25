import { credentials } from 'grpc';
import { userHandler } from '../src/user';
import { apiConfig } from '../src/common/config';

describe('User E2E', () => {
  const client = new userHandler.proto(
    `${apiConfig.host}:${apiConfig.port}`,
    credentials.createInsecure(),
  );

  describe('getUsers', () => {
    it('should return empty user list', (done) => {
      client.getUsers(null, (err: Error, res: any) => {
        if (err) throw err;
        expect(res).toMatchSnapshot();
        done();
      });
    });

    it('should return user list', (done) => {
      client.createUser({ name: 'test' }, (err: Error, _res: any) => {
        if (err) throw err;

        client.getUsers(null, (err: Error, res: any) => {
          if (err) throw err;
          expect(res).toMatchSnapshot();
          done();
        });
      });
    });
  });

  describe('getUserById', () => {
    it('should return user', (done) => {
      client.createUser({ name: 'test' }, (err: Error, res: any) => {
        if (err) throw err;

        client.getUserById({ id: res.data.id }, (err: Error, res: any) => {
          if (err) throw err;
          expect(res).toMatchSnapshot();
          done();
        });
      });
    });

    it('should throw not found exception', (done) => {
      client.getUserById({ id: 0 }, (err: Error, _res: any) => {
        expect(err).toMatchSnapshot();
        done();
      });
    });
  });

  describe('createUser', () => {
    it('should return new user', (done) => {
      client.createUser({ name: 'test' }, (err: Error, res: any) => {
        if (err) throw err;
        expect(res).toMatchSnapshot();
        done();
      });
    });

    // it('should throw bad request exception', () => {});
  });

  describe('updateUserById', () => {
    it('should return updated user', (done) => {
      client.createUser({ name: 'test' }, (err: Error, res: any) => {
        if (err) throw err;

        client.updateUserById(
          { id: res.data.id, name: 'update test' },
          (err: Error, res: any) => {
            if (err) throw err;
            expect(res).toMatchSnapshot();
            done();
          },
        );
      });
    });

    // it('should throw bad request exception', () => {});

    it('should throw not found exception', (done) => {
      client.updateUserById(
        { id: 0, name: 'update test' },
        (err: Error, res: any) => {
          expect(err).toMatchSnapshot();
          done();
        },
      );
    });
  });

  describe('removeUserById', () => {
    it('should remove user', (done) => {
      client.createUser({ name: 'test' }, (err: Error, res: any) => {
        if (err) throw err;

        client.removeUserById({ id: res.data.id }, (err: Error, res: any) => {
          if (err) throw err;
          expect(res).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
