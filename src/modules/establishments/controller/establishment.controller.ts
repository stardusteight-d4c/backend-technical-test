import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  GetEstablishmentUseCase,
  ListEstablishmentsUseCase,
  UpdateEstablishmentUseCase,
  FindEstablishmentsByTypeUseCase,
} from '../use-cases';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';

@Controller('establishments')
export class EstablishmentController {
  constructor(
    private readonly createUseCase: CreateEstablishmentUseCase,
    private readonly getUseCase: GetEstablishmentUseCase,
    private readonly updateUseCase: UpdateEstablishmentUseCase,
    private readonly deleteUseCase: DeleteEstablishmentUseCase,
    private readonly listUseCase: ListEstablishmentsUseCase,
    private readonly findByTypeUseCase: FindEstablishmentsByTypeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateEstablishmentDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  list(@Query('type') type?: string) {
    if (type) {
      return this.findByTypeUseCase.execute(type);
    }
    return this.listUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEstablishmentDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
