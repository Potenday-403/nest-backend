import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tribute } from '../entities/tribute.entity';

@Injectable()
export class TributeRepository extends Repository<Tribute> {
  constructor(private dataSource: DataSource) {
    super(Tribute, dataSource.createEntityManager());
  }
}
