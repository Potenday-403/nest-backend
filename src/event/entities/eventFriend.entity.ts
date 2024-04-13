import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Event } from './event.entity';
import { Friend } from 'src/friend/entities/friend.entity';

@Entity('event_friends')
export class EventFriend {
  @PrimaryColumn()
  eventId: Event;

  @OneToOne(() => Friend)
  @JoinColumn({ name: 'friendId' })
  friend: Friend;

  @OneToOne(() => Event)
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
