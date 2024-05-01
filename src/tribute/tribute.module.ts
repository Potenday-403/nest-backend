import { Module } from '@nestjs/common';
import { TributeController } from './tribute.controller';
import { TributeService } from './tribute.service';
import { TributeRepository } from './repositories/tribute.repository';
import { FriendRepository } from 'src/friend/repositories/friend.repository';

@Module({
  controllers: [TributeController],
  providers: [TributeService, TributeRepository, FriendRepository],
})
export class TributeModule {}
