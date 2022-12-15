import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  // let appService: AppService;
  // let appController: AppController;
  let appController: AppController;

  beforeEach(async () => {
    // appService = new AppService();
    // appController = new AppController(appService);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World');
    });
  });
});
