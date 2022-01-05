import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { UserMockService } from '../src/user/mock/user.service.mock';
import { UserModule } from '../src/user/user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), AppModule, UserModule],
    })
      .overrideProvider(UserService)
      .useValue(UserMockService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/ (GET) w/o API Key', async () => {
    return request(app.getHttpServer())
      .get('/v1/protected-service')
      .expect(401)
  });

  it('/ (GET) public route', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ result: 'Hello from the API' });
  });

  it('/ (GET) w/ API Key on a protected route', async () => {
    return request(app.getHttpServer())
      .get('/v1/protected-service')
      .expect(200);
  });
});
