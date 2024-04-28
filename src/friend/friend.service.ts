import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FriendRepository } from './repositories/friend.repository';
import { CreateFriendReqDto } from './dtos/req/create-friend-req.dto';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Injectable()
export class FriendService {
  constructor(
    private friendRepository: FriendRepository,
    private userRepository: UserRepository,
  ) {}

  async createFriend(props: {
    userId: number;
    createFriendReqDto: CreateFriendReqDto;
  }) {
    const { userId, createFriendReqDto } = props;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('Cannot find user.', HttpStatus.NOT_FOUND);
    }

    const createdFriend = await this.friendRepository.save({
      user,
      ...createFriendReqDto,
    });

    return {
      id: createdFriend.id,
      name: createdFriend.name,
      age: createdFriend.age,
      gender: createdFriend.gender,
      relationship: createdFriend.relationship,
    };
  }
}
