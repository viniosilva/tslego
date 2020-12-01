import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request, { Response } from 'supertest';
import { AppModule } from '../src/AppModule';

describe('AppController (e2e)', () => {
  const path = '/api/users';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('GET /api/users', () => {
    it('should return empty user list', () => {
      return request(app.getHttpServer())
        .get(path)
        .expect(200)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });

    it('should return user list', async () => {
      await request(app.getHttpServer()).post(path).send({ name: 'Test name' });

      return request(app.getHttpServer())
        .get(path)
        .expect(200)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });

  describe('GET /api/users/:userId', () => {
    it('should return user', async () => {
      await request(app.getHttpServer()).post(path).send({ name: 'Test name' });

      return request(app.getHttpServer())
        .get(`${path}/1`)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      return request(app.getHttpServer())
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
      return request(app.getHttpServer())
        .post(path)
        .send(userInput)
        .expect(201)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const userInput = { name: 123 };
      return request(app.getHttpServer())
        .post(path)
        .send(userInput)
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('PUT /api/users/:userId', () => {
    it('should return updated user', async () => {
      await request(app.getHttpServer()).post(path).send({ name: 'Test name' });

      const userInput = { name: 'Test update name' };
      return request(app.getHttpServer())
        .put(`${path}/1`)
        .send(userInput)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const userInput = { name: 123 };
      return request(app.getHttpServer())
        .put(`${path}/0`)
        .send(userInput)
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      const userInput = { name: 'Test update name' };
      return request(app.getHttpServer())
        .put(`${path}/0`)
        .send(userInput)
        .expect(404)
        .expect((res: Response) => {
          expect(res.text).toMatchSnapshot();
        });
    });
  });

  describe('DELETE /api/users/:userId', () => {
    it('should remove user', async () => {
      await request(app.getHttpServer()).post(path).send({ name: 'Test name' });
      return request(app.getHttpServer()).delete(`${path}/1`).expect(204);
    });
  });
});
