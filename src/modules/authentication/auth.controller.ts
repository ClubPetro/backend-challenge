import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Version,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticationDTO } from './dto/authentication.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiBody({
    type: AuthenticationDTO,
    description: 'Generate a valid accessToken',
    examples: {
      a: {
        summary: 'Authentication example',
        value: {
          email: 'fernando@sparapani.com',
          password: '123',
        } as AuthenticationDTO,
      },
    },
  })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Version('1')
  @HttpCode(200)
  @Post('/refresh-token')
  @ApiBody({
    type: RefreshTokenDTO,
    description: 'Generate a valid accessToken',
    examples: {
      a: {
        summary: 'Refresh token example',
        value: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmVybmFuZG8iLCJlbWFpbCI6ImZlcm5hbmRvQHNwYXJhLmNvbSIsImlkIjoxLCJpYXQiOjE2ODI1MjkxODEsImV4cCI6MTY4MjUzMjc4MX0.EEjrKSYciodp0cQGspN9DPHfCsHOlj56qciBO-VBqEo',
        } as RefreshTokenDTO,
      },
    },
  })
  async refreshToken(@Body() body: RefreshTokenDTO) {
    return this.authService.refreshToken(body);
  }
}
