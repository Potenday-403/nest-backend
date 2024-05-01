import { Injectable } from '@nestjs/common';
import { TributeRepository } from './repositories/tribute.repository';
import { ModifyTributeReqDto } from './dtos/req/modify-tribute-req.dto';

@Injectable()
export class TributeService {
  constructor(private tributeRepository: TributeRepository) {}

  async modifyTribute(props: {
    tributeId: number;
    modifyTributeReqDto: ModifyTributeReqDto;
  }) {
    const { tributeId, modifyTributeReqDto } = props;

    const tribute = await this.tributeRepository.getTributeById(tributeId);

    const modifiedTribute = await this.tributeRepository.save({
      ...tribute,
      modifyTributeReqDto,
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
}
