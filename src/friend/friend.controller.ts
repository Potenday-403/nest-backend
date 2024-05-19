import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserId } from 'src/shared/decorators/getUserId';
import { CreateFriendReqDto } from './dtos/req/create-friend-req.dto';
import { FriendService } from './friend.service';
import { ModifyFriendReqDto } from './dtos/req/modify-friend-req.dto';

@Controller('friends')
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

  @Get(':friendId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getFriend(@Param('friendId') friendId) {
    return this.friendService.getFriend(friendId);
  }

  @Delete(':friendId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteFriend(@Param('friendId') friendId) {
    await this.friendService.deleteFriend(friendId);
  }

  @Put(':friendId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async modifyFriend(
    @Param('friendId') friendId,
    @Body() modifyFriendReqDto: ModifyFriendReqDto,
  ) {
    return this.friendService.modifyFriend({ friendId, modifyFriendReqDto });
  }
}
