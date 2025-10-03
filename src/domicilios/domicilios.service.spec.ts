import { Test, TestingModule } from '@nestjs/testing';
import { DomiciliosService } from './domicilios.service';

describe('DomiciliosService', () => {
  let service: DomiciliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomiciliosService],
    }).compile();

    service = module.get<DomiciliosService>(DomiciliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
