import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fns from 'date-fns';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.login(email, password);
    return user || null;
  }
  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        email: user.email,
        id: user.id,
      }),
    };
  }
  async refreshToken(data: RefreshTokenDTO) {
    try {
      const oldPayload = this.jwtService.verify(data.token);
      const payload = {
        name: oldPayload.name,
        email: oldPayload.email,
        id: oldPayload.id,
      };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      const diff = fns.differenceInMinutes(new Date(), error.expiredAt);
      if (diff < 30) {
        const decoded = this.jwtService.decode(data.token, { complete: true });
        const oldPayload = decoded['payload'];
        const payload = {
          name: oldPayload.name,
          email: oldPayload.email,
          id: oldPayload.id,
        };
        return { access_token: this.jwtService.sign(payload) };
      }
      throw new BadRequestException('This token could not be refreshed');
    }
  }
}
