import { Test, TestingModule } from '@nestjs/testing';
import { MetasController } from '../metas.controller';

describe('MetasController', () => {
  let controller: MetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetasController],
    }).compile();

    controller = module.get<MetasController>(MetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
