import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRulesRepository } from '../repositories/establishment-rules.repository';
import { CreateEstablishmentRulesDto } from '../dto/create-establishment-rules.dto';
import { v4 as uuidv4 } from 'uuid';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class CreateEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentRulesRepository')
    private readonly repository: EstablishmentRulesRepository,
  ) {}

  async execute(dto: CreateEstablishmentRulesDto): Promise<EstablishmentRules> {
    const rules: EstablishmentRules = {
      id: uuidv4(),
      ...dto,
    };
    return this.repository.create(rules);
  }
}
