import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request, { Response } from 'supertest';
import { AppModule } from '../src/AppModule';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('getUsers', () => {
    it('should return empty user list', () => {
      const query = 'query { getUsers { id, name } }';

      request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should return user list', async () => {
      let query = 'mutation { createUser(input: { name: "TEST" }) { id } }';
      await request(app.getHttpServer()).post('/graphql').send({ query });

      query = 'query { getUsers { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('getUserById', () => {
    it('should return user', async () => {
      let query = 'mutation { createUser(input: { name: "TEST" }) { id } }';
      await request(app.getHttpServer()).post('/graphql').send({ query });

      query = 'query { getUserById(id: 1) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      const query = 'query { getUserById(id: 0) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('createUser', () => {
    it('should return new user', () => {
      const query =
        'mutation { createUser(input: { name: "TEST" }) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const query =
        'mutation { createUser(input: { name: 123 }) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('updateUserById', () => {
    it('should return updated user', async () => {
      let query = 'mutation { createUser(input: { name: "TEST" }) { id } }';
      await request(app.getHttpServer()).post('/graphql').send({ query });

      query =
        'mutation { updateUserById(id: 1, input: { name: "TEST UPDATE" }) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw bad request exception', () => {
      const query =
        'mutation { updateUserById(id: 1, input: { name: 123 }) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should throw not found exception', () => {
      const query =
        'mutation { updateUserById(id: 0, input: { name: "TEST UPDATE" }) { id, name } }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });

  describe('removeUserById', () => {
    it('should remove user', async () => {
      let query = 'mutation { createUser(input: { name: "TEST" }) { id } }';
      await request(app.getHttpServer()).post('/graphql').send({ query });

      query = 'mutation { removeUserById(id: 1) }';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect((res: Response) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});
