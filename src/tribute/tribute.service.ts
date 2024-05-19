import { Injectable } from '@nestjs/common';
import { TributeRepository } from './repositories/tribute.repository';
import { ModifyTributeReqDto } from './dtos/req/modify-tribute-req.dto';
import { CreateTributeReqDto } from './dtos/req/create-tribute-req.dto';
import { FriendRepository } from 'src/friend/repositories/friend.repository';

@Injectable()
export class TributeService {
  constructor(
    private tributeRepository: TributeRepository,
    private friendRepository: FriendRepository,
  ) {}

  async modifyTribute(props: {
    tributeId: number;
    modifyTributeReqDto: ModifyTributeReqDto;
  }) {
    const { tributeId, modifyTributeReqDto } = props;

    const tribute = await this.tributeRepository.getTributeById(tributeId);

    const modifiedTribute = await this.tributeRepository.save({
      ...tribute,
      ...modifyTributeReqDto,
    });

    return {
      tributeId: modifiedTribute.id,
      eventType: modifiedTribute.type,
      tributeName: modifiedTribute.name,
      price: modifiedTribute.price,
      isReceived: modifiedTribute.isReceived,
      date: modifiedTribute.transactionDate,
    };
  }

  async createTribute(createTributeReqDto: CreateTributeReqDto) {
    const friend = await this.friendRepository.getFriendById(
      createTributeReqDto.friendId,
    );

    const savedTribute = await this.tributeRepository.save({
      type: createTributeReqDto.eventType,
      name: createTributeReqDto.tributeName,
      price: createTributeReqDto.price,
      isReceived: createTributeReqDto.isReceived,
      transactionDate: createTributeReqDto.date,
      friend,
    });

    return {
      tributeId: savedTribute.id,
      friendId: friend.id,
      eventType: savedTribute.type,
      tributeName: savedTribute.name,
      price: savedTribute.price,
      isReceived: savedTribute.isReceived,
      date: savedTribute.transactionDate,
    };
  }

  async deleteTribute(tributeId: number) {
    const tribute = await this.tributeRepository.getTributeById(tributeId);

    await this.tributeRepository.update({ id: tributeId }, { isDeleted: true });
  }
}
