import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { id, age, gender, occupation } = props;

    await this.update({ id }, { age, gender, occupation });
  }

  async getUserBySocialId(socialId: string) {
    return this.findOne({ where: { socialId } });
  }

  async getUserById(id: number) {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Cannot find user.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(socialId: string): Promise<User> {
    const user = await this.save({ socialId });

    return user;
  }
}
