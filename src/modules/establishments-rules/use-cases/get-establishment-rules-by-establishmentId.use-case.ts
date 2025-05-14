import { Inject, Injectable } from '@nestjs/common';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class GetEstablishmentRulesByEstablishmentIdUseCase {
  constructor(
    @Inject('EstablishmentsRulesRepository')
    private readonly repository: EstablishmentsRulesRepository,
  ) {}

  async execute(establishmentId: string): Promise<EstablishmentRules | null> {
    return this.repository.findByEstablishmentId(establishmentId);
  }
}
