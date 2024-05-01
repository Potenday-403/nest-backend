import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Friend } from '../entities/friend.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class FriendRepository extends Repository<Friend> {
  constructor(private dataSource: DataSource) {
    super(Friend, dataSource.createEntityManager());
  }

  async getFriendsByUser(user: User) {
    const friends = await this.find({ where: { user } });

    return friends;
  }
}
