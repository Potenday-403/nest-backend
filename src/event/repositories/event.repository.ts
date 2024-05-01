import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventRepository extends Repository<Event> {
  constructor(private dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }

  async getEventByEventId(eventId: number) {
    const event = await this.findOne({ where: { id: eventId } });

    if (!event) {
      throw new HttpException('Cannot find event.', HttpStatus.NOT_FOUND);
    }

    return event;
  }
}
