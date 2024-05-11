import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './event.service';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { EventRepository } from './repositories/event.repository';
import { FriendRepository } from 'src/friend/repositories/friend.repository';
import { OpenAIService } from 'src/externals/openai/openai.service';
import { TributeRepository } from 'src/tribute/repositories/tribute.repository';
import { GreetingController } from './controllers/greeting.controller';
import { StatisticsController } from './controllers/statistics.controller';

@Module({
  controllers: [EventController, GreetingController, StatisticsController],
  providers: [
    EventService,
    UserRepository,
    EventRepository,
    FriendRepository,
    OpenAIService,
    TributeRepository,
  ],
})
export class EventModule {}
