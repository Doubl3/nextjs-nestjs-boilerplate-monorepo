import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .compile();
  });

  describe('sayHello', () => {
    const returnedValue = { result: 'Hello from the API' };
    it(`should return "${JSON.stringify(returnedValue)}"`, () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.sayHello()).toEqual(returnedValue);
    });
  });

  describe('getLivenessProbe', () => {
    const returnedValue = { result: "I'm alive" };
    it(`should return "${JSON.stringify(returnedValue)}"`, async () => {
      const appController = app.get<AppController>(AppController);
      const result = await appController.getLivenessProbe();

      expect(result).toEqual(returnedValue);
    });
  });
});
