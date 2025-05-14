import { Inject, Injectable } from '@nestjs/common';

import { EstablishmentsRulesRepository } from '../repositories/establishments-rules.repository';

@Injectable()
export class DeleteEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentsRulesRepository')
    private readonly repository: EstablishmentsRulesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
