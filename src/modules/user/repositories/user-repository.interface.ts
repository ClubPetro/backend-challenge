import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  createUser(user: CreateUserDto): Promise<number>;
  findUser(email: string): Promise<User>;
  findUserAndPassword(email: string): Promise<User>;
}
