import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { EstablishmentsRepository } from '../../establishments/repositories/establishments.repository';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';
import { CreateEstablishmentRulesDto } from '../dto/create-establishment-rules.dto';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class CreateEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentsRulesRepository')
    private readonly rulesRepository: EstablishmentsRulesRepository,

    @Inject('EstablishmentsRepository')
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  async execute(dto: CreateEstablishmentRulesDto): Promise<EstablishmentRules> {
    const establishment = await this.establishmentsRepository.findById(
      dto.establishmentId,
    );
    if (!establishment) {
      throw new NotFoundException(
        `Establishment ${dto.establishmentId} not found`,
      );
    }

    const rules: EstablishmentRules = {
      id: uuidv4(),
      ...dto,
    };

    return this.rulesRepository.create(rules);
  }
}
