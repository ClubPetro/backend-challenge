import { Test, TestingModule } from '@nestjs/testing';
import { LocalsService } from './locals.service';

describe('LocalsService', () => {
  let service: LocalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalsService],
    }).compile();

    service = module.get<LocalsService>(LocalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
