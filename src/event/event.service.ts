import { Injectable } from '@nestjs/common';
import { EventRepository } from './repositories/event.repository';
import { CreateEventReqDto } from './dtos/req/create-event-req.dto';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { FriendRepository } from 'src/friend/repositories/friend.repository';
import { ModifyEventReqDto } from './dtos/req/modify-event-req.dto';
import { OpenAIService } from 'src/externals/openai/openai.service';
import { TributeRepository } from 'src/tribute/repositories/tribute.repository';
import { Between, Like } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
    private friendRepository: FriendRepository,
    private openAIService: OpenAIService,
    private tributeRepository: TributeRepository,
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

  async deleteEvents(eventIds: number[]) {
    await Promise.all(
      eventIds.map(async (id) => {
        await this.eventRepository.delete(id);
      }),
    );
  }

  async getEvent(eventId: number) {
    const event = await this.eventRepository.getEventByEventId(eventId);
    const friend = event.friend ?? null;
    const lastTribute = friend
      ? await this.tributeRepository.findOne({
          where: { friend },
          order: { createdAt: 'DESC' },
        })
      : null;
    const greetings = await this.openAIService.getAnswer({
      relationship: friend ? friend.relationship : null,
      eventType: event.type,
    });

    return {
      id: event.id,
      name: event.name,
      type: event.type,
      scheduledAt: event.scheduledAt,
      priority: event.priority,
      recommendedGreetings: greetings,
      friend: friend
        ? {
            id: friend.id,
            name: friend.name,
            relationship: friend.relationship,
            lastTribute: lastTribute
              ? {
                  date: lastTribute.transactionDate,
                  type: lastTribute.type,
                  name: lastTribute.name,
                  price: lastTribute.price,
                  isReceived: lastTribute.isReceived,
                }
              : null,
          }
        : null,
    };
  }

  async getRemindList(props: { userId: number; date: Date }) {
    const { userId, date } = props;
    const before10Days = new Date(new Date(date).setDate(date.getDate() - 10));

    const user = await this.userRepository.getUserById(userId);
    const eventsWithin10Days = await this.eventRepository.find({
      where: { user, scheduledAt: Between(before10Days, date) },
      order: { scheduledAt: 'DESC' },
    });

    return {
      date: date.toISOString().split('T')[0],
      events: eventsWithin10Days.map((event) => ({
        id: event.id,
        name: event.name,
        scheduledAt: event.scheduledAt,
        priority: event.priority,
      })),
      count: eventsWithin10Days.length,
    };
  }

  async getCalender(props: { userId: number; year: number; month: number }) {
    const { userId, year, month } = props;
    const startDate = new Date(year, month + 1);
    const endDate = new Date(year, month + 2);

    const user = await this.userRepository.getUserById(userId);
    const events = await this.eventRepository.find({
      where: { user, scheduledAt: Between(startDate, endDate) },
      order: { scheduledAt: 'ASC' },
    });

    return {
      year,
      month,
      events: events.map((event) => ({
        id: event.id,
        name: event.name,
        priority: event.priority,
        scheduledAt: event.scheduledAt,
      })),
    };
  }
}
