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
import { PlaceService } from 'src/place/place.service';
import { PlaceCreateDto } from './dto/place.create.dto';
import { PlaceUpdateDto } from './dto/place.update.dto';
import { Place } from './places.entity';

@ApiTags('lugares')
@Controller('lugar')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('cadastrar')
  @ApiOperation({ summary: 'Cadastra uma meta' })
  @ApiCreatedResponse({
    description: 'Meta inserida com sucesso',
    type: PlaceCreateDto,
  })
  @ApiResponse({ status: 422, description: 'A data está inválida' })
  @ApiConflictResponse({ description: 'A meta já existe' })
  @ApiBody({ description: 'Lista de metas', type: PlaceCreateDto })
  async create(@Body() data: PlaceCreateDto): Promise<Place> {
    return await this.placeService.create(data);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Retorna todas as metas' })
  @ApiOkResponse({ description: 'Metas retornadas com sucesso' })
  async findAll(): Promise<Place[]> {
    return await this.placeService.getAll();
  }

  @Get('listar/:id')
  @ApiOperation({ summary: 'Retorna meta pelo id' })
  @ApiOkResponse({ description: 'Meta retornada com sucesso' })
  @ApiNotFoundResponse({ description: 'Meta não encontrada' })
  async findOne(@Param('id') id: string): Promise<Place> {
    return await this.placeService.getById(id);
  }

  @Put('atualizar/:id')
  @ApiOperation({ summary: 'Atualiza uma meta' })
  @ApiResponse({ status: 422, description: 'A data está inválida' })
  @ApiNotFoundResponse({ description: 'Meta não encontrada' })
  @ApiOkResponse({
    description: 'Meta atualizada com sucesso',
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
  @ApiOperation({ summary: 'Deleta uma meta' })
  @ApiOkResponse({ description: 'Lugar deletado com sucesso' })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.placeService.delete(id);
  }
}
