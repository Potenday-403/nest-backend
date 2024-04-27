import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async updateUserPersonalInfo(props: {
    id: number;
    age: number;
    gender: string;
    occupation: string;
  }) {
    await this.save(props);
  }

  async getUserBySocialId(socialId: string) {
    return this.findOne({ where: { socialId } });
  }

  async createUser(socialId: string): Promise<User> {
    const user = await this.save({ socialId });

    return user;
  }
}
