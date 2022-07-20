import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/shared/presenters';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be able return the healthcheck application', () => {
    expect(controller.healthcheck().env).toBe('test');
    expect(typeof controller.healthcheck().uptime).toBe('number');
  });
});
