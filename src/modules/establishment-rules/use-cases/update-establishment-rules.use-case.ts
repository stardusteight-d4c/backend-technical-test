import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRulesRepository } from '../repositories/establishment-rules.repository';
import { UpdateEstablishmentRulesDto } from '../dto/update-establishment-rules.dto';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class UpdateEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentRulesRepository')
    private readonly repository: EstablishmentRulesRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateEstablishmentRulesDto,
  ): Promise<EstablishmentRules> {
    return this.repository.update(id, dto);
  }
}
