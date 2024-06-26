import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './repositories/friend.repository';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { EventRepository } from 'src/event/repositories/event.repository';
import { TributeRepository } from 'src/tribute/repositories/tribute.repository';

@Module({
  controllers: [FriendController],
  providers: [
    FriendService,
    FriendRepository,
    UserRepository,
    EventRepository,
    TributeRepository,
  ],
})
export class FriendModule {}
