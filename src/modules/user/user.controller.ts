import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/strategies/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Version('1')
  @ApiBody({
    type: CreateUserDto,
    description: 'Create a user',
    examples: {
      a: {
        summary: 'Create user example',
        value: {
          email: 'luis@angelo.com',
          name: 'Luis Angelo',
          password: '123',
        } as CreateUserDto,
      },
    },
  })
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Version('1')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ type: 'string', name: 'email', required: true })
  @ApiBearerAuth('JWT-auth')
  async findUser(@Query('email') email: string) {
    return await this.userService.findUser(email);
  }
}
