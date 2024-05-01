import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getFriendById(friendId: number) {
    const friend = await this.findOne({ where: { id: friendId } });

    if (!friend) {
      throw new HttpException('Cannot find friend.', HttpStatus.NOT_FOUND);
    }

    return friend;
  }
}
