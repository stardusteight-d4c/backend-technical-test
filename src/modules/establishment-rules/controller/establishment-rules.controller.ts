// src/modules/establishment-rules/controller/establishment-rules.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CreateEstablishmentRulesDto } from '../dto/create-establishment-rules.dto';
import { UpdateEstablishmentRulesDto } from '../dto/update-establishment-rules.dto';
import {
  CreateEstablishmentRulesUseCase,
  GetEstablishmentRulesByEstablishmentIdUseCase,
  UpdateEstablishmentRulesUseCase,
  DeleteEstablishmentRulesUseCase,
} from '../use-cases';

@Controller('establishment-rules')
export class EstablishmentRulesController {
  constructor(
    private readonly createUseCase: CreateEstablishmentRulesUseCase,
    private readonly getByEstablishmentUseCase: GetEstablishmentRulesByEstablishmentIdUseCase,
    private readonly updateUseCase: UpdateEstablishmentRulesUseCase,
    private readonly deleteUseCase: DeleteEstablishmentRulesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateEstablishmentRulesDto) {
    return this.createUseCase.execute(dto);
  }

  @Get(':establishmentId')
  findByEstablishment(@Param('establishmentId') id: string) {
    return this.getByEstablishmentUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEstablishmentRulesDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
