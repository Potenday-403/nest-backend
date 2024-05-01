import { User } from 'src/auth/entities/user.entity';
import { Friend } from 'src/friend/entities/friend.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  scheduledAt: Date;

  @Column()
  priority: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @ManyToOne(() => Friend, (friend) => friend.events)
  friend: Friend;
}
