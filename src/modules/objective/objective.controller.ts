import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { ObjectiveGetAllOptions } from 'src/commons/types/objective.type';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ObjectiveResponseDataDto,
  ObjectiveResponseDto,
} from './dto/objective-response.dto';

@Controller('objective')
@ApiTags('Objective')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @Post()
  @ApiOperation({ summary: 'Create Objective' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObjectiveResponseDataDto,
  })
  @ApiBody({
    required: true,
    type: CreateObjectiveDto,
    description: 'Add Objective',
  })
  create(@Body() createObjectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(createObjectiveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Objective' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObjectiveResponseDto,
    isArray: true,
  })
  findAll(@Query() options: ObjectiveGetAllOptions) {
    return this.objectiveService.findAll(options);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Objective' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObjectiveResponseDataDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.objectiveService.update(id, updateObjectiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Objective' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ObjectiveResponseDataDto,
  })
  remove(@Param('id') id: string) {
    return this.objectiveService.remove(id);
  }
}
