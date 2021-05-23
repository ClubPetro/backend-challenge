import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceCreateDto } from './dto/place.create.dto';
import { PlaceUpdateDto } from './dto/place.update.dto';
import { PlaceService } from './place.service';
import { Place } from './places.entity';

@ApiTags('lugares')
@Controller('lugar')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('cadastrar')
  @ApiOperation({ summary: 'Cadastra um lugar' })
  @ApiCreatedResponse({
    description: 'Lugar inserido com sucesso',
    type: PlaceCreateDto,
  })
  @ApiResponse({ status: 422, description: 'A data está inválida' })
  @ApiConflictResponse({ description: 'A Lugar já existe' })
  @ApiBody({ description: 'Lista de lugares', type: PlaceCreateDto })
  async create(@Body() data: PlaceCreateDto): Promise<Place> {
    return await this.placeService.create(data);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Retorna todos os lugares' })
  @ApiOkResponse({ description: 'Lugares retornados com sucesso' })
  async findAll(): Promise<Place[]> {
    return await this.placeService.getAll();
  }

  @Get('listar/:id')
  @ApiOperation({ summary: 'Retorna lugar pelo id' })
  @ApiOkResponse({ description: 'Lugar retornado com sucesso' })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado' })
  async findOne(@Param('id') id: string): Promise<Place> {
    return await this.placeService.getById(id);
  }

  @Put('atualizar/:id')
  @ApiOperation({ summary: 'Atualiza meta/lugar' })
  @ApiResponse({ status: 422, description: 'A data está inválida' })
  @ApiNotFoundResponse({ description: 'Lugar não encontrada' })
  @ApiOkResponse({
    description: 'Lugar atualizado com sucesso',
    type: PlaceUpdateDto,
  })
  @ApiBadRequestResponse({ description: 'Data no formato errado' })
  @ApiBody({ type: PlaceUpdateDto })
  async update(
    @Param('id') id: string,
    @Body() data: PlaceUpdateDto,
  ): Promise<Place> {
    return await this.placeService.update(id, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um lugar' })
  @ApiOkResponse({ description: 'Lugar deletado com sucesso' })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.placeService.delete(id);
  }
}
