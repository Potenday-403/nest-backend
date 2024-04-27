import { User } from 'src/auth/entities/user.entity';
import { Friend } from 'src/friend/entities/friend.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToOne(() => User, (user) => user.tributes)
  user: User;

  @ManyToOne(() => Friend, (friend) => friend.tributes)
  friend: Friend;
}
