import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRulesRepository } from '../repositories/establishment-rules.repository';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class GetEstablishmentRulesByEstablishmentIdUseCase {
  constructor(
    @Inject('EstablishmentRulesRepository')
    private readonly repository: EstablishmentRulesRepository,
  ) {}

  async execute(establishmentId: string): Promise<EstablishmentRules | null> {
    return this.repository.findByEstablishmentId(establishmentId);
  }
}
