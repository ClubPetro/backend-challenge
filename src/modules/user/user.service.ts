import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Utils } from '../../utils/utils';

@Injectable()
export class UserService {
  private repository: UserRepository;

  constructor(private dataSource: DataSource) {
    this.repository = new UserRepository(this.dataSource);
  }

  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    if (!user.email || !user.password) {
      throw new BadRequestException(
        'Email & Password fields could not be empty',
      );
    }

    const existentUser = await this.repository.findUser(user.email);
    if (existentUser) {
      throw new BadRequestException('Already exist a user with this email');
    }

    user.password = Utils.hashGenerate(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const id = await this.repository.createUser({ ...user });
    const { password, ...response } = user;
    return {
      ...response,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      id,
    };
  }

  async findUser(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Email could not be empty');
    }
    const user = await this.repository.findUser(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new BadRequestException('Email & Password could not be empty');
    }
    const user = await this.repository.findUserAndPassword(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hashValidation = Utils.validateHash(password, user.password);
    if (!hashValidation) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
