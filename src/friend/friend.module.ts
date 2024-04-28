import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { FriendRepository } from './repositories/friend.repository';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Module({
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, UserRepository],
})
export class FriendModule {}
