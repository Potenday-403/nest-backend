import { Test, TestingModule } from '@nestjs/testing';
import { TributeController } from './tribute.controller';

describe('TributeController', () => {
  let controller: TributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TributeController],
    }).compile();

    controller = module.get<TributeController>(TributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
