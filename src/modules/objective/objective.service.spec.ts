import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveService } from './objective.service';

describe('ObjectiveService', () => {
  let service: ObjectiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectiveService],
    }).compile();

    service = module.get<ObjectiveService>(ObjectiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
