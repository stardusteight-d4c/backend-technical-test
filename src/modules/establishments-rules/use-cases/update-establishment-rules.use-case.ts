import { Inject, Injectable } from '@nestjs/common';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';
import { UpdateEstablishmentRulesDto } from '../dto/update-establishment-rules.dto';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class UpdateEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentsRulesRepository')
    private readonly repository: EstablishmentsRulesRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateEstablishmentRulesDto,
  ): Promise<EstablishmentRules> {
    return this.repository.update(id, dto);
  }
}
