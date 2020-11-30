import request, { Response } from 'supertest';
import { logger } from '../src/common/logger';
import { Server } from '../src/Server';
import { userController } from '../src/user';

describe('User E2E', () => {
  const server = new Server('', 0, logger, {}, [userController.router]);
  const path = '/api/users';

  describe('GET /api/users', () => {
    it('should return empty user list', () => {
      return request(server.app)
        .get(path)
        .expect(200)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });

    it('should return user list', async () => {
      const userInput = { name: 'Test name' };
      await request(server.app).post(path).send(userInput);

      return request(server.app)
        .get(path)
        .expect(200)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });

  describe('GET /api/users/:userId', () => {
    it('should return user', () => {
      return request(server.app)
        .get(`${path}/1`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      return request(server.app)
        .get(`${path}/0`)
        .expect(404)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });

  describe('POST /api/users', () => {
    it('should return new user', () => {
      const userInput = { name: 'Test name' };
      return request(server.app)
        .post(path)
        .send(userInput)
        .expect(201)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('PUT /api/users/:userId', () => {
    it('should return updated user', () => {
      const userInput = { name: 'Test update name' };
      return request(server.app)
        .put(`${path}/1`)
        .send(userInput)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      const userInput = { name: 'Test update name' };
      return request(server.app)
        .put(`${path}/0`)
        .send(userInput)
        .expect(404)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });

  describe('DELETE /api/users/:userId', () => {
    it('should remove user', () => {
      return request(server.app)
        .delete(`${path}/1`)
        .expect(204)
    });
  });
});
