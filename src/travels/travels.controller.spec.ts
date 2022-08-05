import { Test, TestingModule } from '@nestjs/testing';
import { TravelsController } from './travels.controller';

describe('TravelsController', () => {
  let controller: TravelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelsController],
    }).compile();

    controller = module.get<TravelsController>(TravelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
