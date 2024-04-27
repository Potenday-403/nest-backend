import { Event } from 'src/event/entities/event.entity';
import { Tribute } from 'src/tribute/entities/tribute.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ unique: true })
  socialId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Tribute, (tribute) => tribute.user)
  tributes: Tribute[];
}
