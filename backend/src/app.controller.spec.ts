import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { roomSettingsMock, availabilitiesMock } from '../mocks/Slots';

jest.mock('./helpers/getData', () => ({
  getData: jest.fn(() => Promise.resolve(roomSettingsMock)),
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('week availabilities', () => {
    it('should return week availabilities', async () => {
      const data = await appController.getSlots();
      expect(data).toEqual(availabilitiesMock);
    });
  });
});
