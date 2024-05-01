import { Module } from '@nestjs/common';
import { TributeController } from './tribute.controller';
import { TributeService } from './tribute.service';
import { TributeRepository } from './repositories/tribute.repository';

@Module({
  controllers: [TributeController],
  providers: [TributeService, TributeRepository],
})
export class TributeModule {}
