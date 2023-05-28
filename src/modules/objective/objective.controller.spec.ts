import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveController } from './objective.controller';
import { ObjectiveService } from './objective.service';

describe('ObjectiveController', () => {
  let controller: ObjectiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectiveController],
      providers: [ObjectiveService],
    }).compile();

    controller = module.get<ObjectiveController>(ObjectiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
