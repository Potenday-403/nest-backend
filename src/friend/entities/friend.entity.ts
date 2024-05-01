import { User } from 'src/auth/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { Tribute } from 'src/tribute/entities/tribute.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  gender: string;

  @Column()
  relationship: string;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @OneToMany(() => Tribute, (tribute) => tribute.friend)
  tributes: Tribute[];

  @OneToMany(() => Event, (event) => event.friend)
  events: Event[];
}
