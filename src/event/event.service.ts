import { Injectable } from '@nestjs/common';
import { EventRepository } from './repositories/event.repository';
import { CreateEventReqDto } from './dtos/req/create-event-req.dto';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { FriendRepository } from 'src/friend/repositories/friend.repository';
import { ModifyEventReqDto } from './dtos/req/modify-event-req.dto';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
    private friendRepository: FriendRepository,
  ) {}

  async createEvent(props: {
    userId: number;
    createEventReqDto: CreateEventReqDto;
  }) {
    const { userId, createEventReqDto } = props;

    const user = await this.userRepository.getUserById(userId);
    const friend = createEventReqDto.friendId
      ? await this.friendRepository.getFriendById(createEventReqDto.friendId)
      : null;

    await this.eventRepository.save({
      user,
      friend,
      name: createEventReqDto.name,
      type: createEventReqDto.type,
      scheduledAt: createEventReqDto.scheduledAt,
      priority: createEventReqDto.priority,
    });
  }

  async modifyEvent(props: {
    eventId: number;
    modifyEventReqDto: ModifyEventReqDto;
  }) {
    const { eventId, modifyEventReqDto } = props;

    const event = await this.eventRepository.getEventByEventId(eventId);
    const friend = modifyEventReqDto.friendId
      ? await this.friendRepository.getFriendById(modifyEventReqDto.friendId)
      : null;

    await this.eventRepository.save({
      ...event,
      friend,
      name: modifyEventReqDto.name,
      type: modifyEventReqDto.type,
      scheduledAt: modifyEventReqDto.scheduledAt,
      priority: modifyEventReqDto.priority,
    });
  }
}
