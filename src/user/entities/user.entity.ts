import { Social } from 'src/auth/entities/social.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column()
  occupation: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Social)
  @JoinColumn({ name: 'id' })
  social: Social;
}
