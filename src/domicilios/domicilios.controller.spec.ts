import { Test, TestingModule } from '@nestjs/testing';
import { DomiciliosController } from './domicilios.controller';
import { DomiciliosService } from './domicilios.service';

describe('DomiciliosController', () => {
  let controller: DomiciliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomiciliosController],
      providers: [DomiciliosService],
    }).compile();

    controller = module.get<DomiciliosController>(DomiciliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
