import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserId } from 'src/shared/decorators/getUserId';
import { CreateFriendReqDto } from './dtos/req/create-friend-req.dto';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createFriend(
    @GetUserId() id: number,
    @Body() createFriendReqDto: CreateFriendReqDto,
  ) {
    return this.friendService.createFriend({ userId: id, createFriendReqDto });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getFriends(@GetUserId() id: number) {
    const friends = await this.friendService.getSortedFriends(id);

    return { friends };
  }
}
