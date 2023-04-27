import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PaginationResultDTO } from '../../utils/dto/pagination-result.dto';
import { PaginationDTO } from '../../utils/dto/pagination.dto';
import { SuccessResponseDTO } from '../../utils/dto/success-response.dto';
import { JwtAuthGuard } from '../authentication/strategies/jwt-auth.guard';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { UpdateTravelDTO } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import { TravelService } from './travel.service';
import { ListTravelsDTO } from './dto/list-travels.dto';

@Controller()
@ApiTags('Travel')
export class TravelController {
  constructor(private travelService: TravelService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ type: 'number', name: 'rows', required: false })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @Get('travels')
  async list(@Query() query: ListTravelsDTO): Promise<PaginationResultDTO> {
    return await this.travelService.list(query);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: 'travel indentifier',
  })
  @Get('travel/:id')
  async find(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ): Promise<Travel> {
    return await this.travelService.find(id, userId);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: CreateTravelDTO,
    description: 'Create a travel',
    examples: {
      a: {
        summary: 'Create travel example',
        value: {
          country: 'Brasil',
          flagUrl: 'bandeira.png',
          goal: '12/2024',
          locale: 'São Paulo',
        } as CreateTravelDTO,
      },
    },
  })
  @Post('travel')
  async create(@Body() body: CreateTravelDTO): Promise<Partial<Travel>> {
    return await this.travelService.create(body);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: UpdateTravelDTO,
    description: 'Update a travel',
    examples: {
      a: {
        summary: 'Update travel example',
        value: {
          goal: '12/2024',
          locale: 'São Paulo',
        } as UpdateTravelDTO,
      },
    },
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: 'travel identifier',
  })
  @ApiQuery({
    type: Number,
    name: 'userId',
    required: false,
    description: 'user identifier (auto-filled by JWT token)',
  })
  @Put('travel/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateTravelDTO,
  ): Promise<Travel> {
    return await this.travelService.update(id, body);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: 'travel identifier',
  })
  @ApiQuery({
    type: Number,
    name: 'userId',
    required: false,
    description: 'user identifier (auto-filled by JWT token)',
  })
  @Delete('travel/:id')
  async delete(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ): Promise<SuccessResponseDTO> {
    return await this.travelService.delete(id, userId);
  }
}
