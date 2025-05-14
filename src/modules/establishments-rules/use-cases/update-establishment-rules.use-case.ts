import { Inject, Injectable } from '@nestjs/common';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';
import { UpdateEstablishmentRulesDto } from '../dto/update-establishment-rules.dto';
import { EstablishmentRules } from '../entities/establishment-rule.entity';
import { sanitizeObject } from 'src/shared/utils/sanitize-object';

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
    const filteredDto = sanitizeObject(dto);
    return this.repository.update(id, filteredDto);
  }
}
