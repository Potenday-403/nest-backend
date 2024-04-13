import { Social } from 'src/auth/entities/social.entity';
import { Friend } from 'src/friend/entities/friend.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tributes')
export class Tribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  isReceived: boolean;

  @Column()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Social, (social) => social.tributes)
  user: Social;

  @ManyToOne(() => Friend, (friend) => friend.tributes)
  friend: Friend;
}
