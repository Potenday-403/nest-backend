import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { EventRepository } from './repositories/event.repository';
import { FriendRepository } from 'src/friend/repositories/friend.repository';

@Module({
  controllers: [EventController],
  providers: [EventService, UserRepository, EventRepository, FriendRepository],
})
export class EventModule {}
