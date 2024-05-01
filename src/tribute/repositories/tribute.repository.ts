import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tribute } from '../entities/tribute.entity';

@Injectable()
export class TributeRepository extends Repository<Tribute> {
  constructor(private dataSource: DataSource) {
    super(Tribute, dataSource.createEntityManager());
  }

  async getTributeById(tributeId: number) {
    const tribute = await this.findOne({ where: { id: tributeId } });

    if (!tribute) {
      throw new HttpException('Cannot find tribute.', HttpStatus.NOT_FOUND);
    }

    return tribute;
  }
}
