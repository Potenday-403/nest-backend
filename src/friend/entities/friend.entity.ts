import { Tribute } from 'src/tribute/entities/tribute.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Tribute, (tribute) => tribute.friend)
  tributes: Tribute[];
}
