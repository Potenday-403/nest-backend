import { Injectable } from '@nestjs/common';
import { FriendRepository } from './repositories/friend.repository';
import { CreateFriendReqDto } from './dtos/req/create-friend-req.dto';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { EventRepository } from 'src/event/repositories/event.repository';
import { In, MoreThan } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { Event } from 'src/event/entities/event.entity';
import { TributeRepository } from 'src/tribute/repositories/tribute.repository';
import { ModifyFriendReqDto } from './dtos/req/modify-friend-req.dto';

@Injectable()
export class FriendService {
  constructor(
    private friendRepository: FriendRepository,
    private userRepository: UserRepository,
    private eventRepository: EventRepository,
    private tributeRepository: TributeRepository,
  ) {}

  async createFriend(props: {
    userId: number;
    createFriendReqDto: CreateFriendReqDto;
  }) {
    const { userId, createFriendReqDto } = props;

    const user = await this.userRepository.getUserById(userId);

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

  async getSortedFriends(userId: number) {
    const friends = await this.friendRepository.getFriendsByUserId(userId);

    const friendsWithEvent: { friend: Friend; closestEvent: Event }[] = [];
    const friendsWithoutEvent: { friend: Friend }[] = [];

    await Promise.all(
      friends.map(async (friend) => {
        const closestEvent = await this.eventRepository.findOne({
          where: { friend, scheduledAt: MoreThan(new Date()) },
          order: { scheduledAt: 'ASC' },
        });

        if (closestEvent) friendsWithEvent.push({ friend, closestEvent });
        else friendsWithoutEvent.push({ friend });
      }),
    );

    const sortedFriends = [
      ...friendsWithEvent.sort(
        (a, b) =>
          new Date(a.closestEvent.scheduledAt).getTime() -
          new Date(b.closestEvent.scheduledAt).getTime(),
      ),
      ...friendsWithoutEvent.sort((a, b) =>
        a.friend.name.localeCompare(b.friend.name),
      ),
    ];

    return sortedFriends.map(({ friend }) => ({
      id: friend.id,
      name: friend.name,
      age: friend.age,
      gender: friend.gender,
      relationship: friend.relationship,
    }));
  }

  async getFriend(friendId: number) {
    const friend = await this.friendRepository.getFriendById(friendId);

    const tributes = await this.tributeRepository.find({
      where: { friend },
      order: { transactionDate: 'DESC' },
    });

    return {
      name: friend.name,
      age: friend.age,
      gender: friend.gender,
      relationship: friend.relationship,
      tributes: tributes.map(
        ({ id, transactionDate, type, name, price, isReceived }) => ({
          id,
          date: transactionDate.toISOString().split('T')[0],
          type,
          name,
          price,
          isReceived,
        }),
      ),
    };
  }

  async deleteFriend(friendId: number) {
    const friend = await this.friendRepository.getFriendById(friendId);

    await this.friendRepository.remove(friend);
  }

  async modifyFriend(props: {
    friendId: number;
    modifyFriendReqDto: ModifyFriendReqDto;
  }) {
    const { friendId, modifyFriendReqDto } = props;

    const friend = await this.friendRepository.getFriendById(friendId);

    const modifiedFriend = await this.friendRepository.save({
      friend,
      ...modifyFriendReqDto,
    });

    return {
      id: modifiedFriend.id,
      name: modifiedFriend.name,
      age: modifiedFriend.age,
      gender: modifiedFriend.gender,
      relationship: modifiedFriend.relationship,
    };
  }
}
