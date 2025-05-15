import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';
import { EstablishmentRules } from '../entities/establishment-rule.entity';
import { EstablishmentsRepository } from '../../establishments/repositories/establishments.repository';

@Injectable()
export class GetEstablishmentRulesByEstablishmentIdUseCase {
  constructor(
    @Inject('EstablishmentsRulesRepository')
    private readonly rulesRepository: EstablishmentsRulesRepository,

    @Inject('EstablishmentsRepository')
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  async execute(establishmentId: string): Promise<EstablishmentRules | null> {
    const exists = await this.establishmentsRepository.findById(establishmentId);

    if (!exists) {
      throw new NotFoundException(`Establishment ${establishmentId} not found`);
    }

    return this.rulesRepository.findByEstablishmentId(establishmentId);
  }
}
