import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './user-repository.interface';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private dataSource: DataSource) {}

  async createUser(user: CreateUserDto): Promise<number> {
    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ ...user })
      .execute();

    return result.identifiers[0].id;
  }

  async findUserAndPassword(email: string): Promise<User> {
    return await this.dataSource
      .createQueryBuilder()
      .from(User, 'user')
      .where('user.email = :email', { email })
      .select([
        'user.email AS email',
        'user.password AS password',
        'user.id AS id',
        'user.name AS name',
      ])
      .getRawOne();
  }

  async findUser(email: string): Promise<User> {
    return await this.dataSource
      .createQueryBuilder()
      .from(User, 'user')
      .where('user.email = :email', { email })
      .select([
        'user.id AS id',
        'user.name AS name',
        'user.email AS email',
        'user.createdAt AS created_at',
        'user.updatedAt AS updated_at',
      ])
      .getRawOne();
  }
}
