import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRulesRepository } from '../repositories/establishment-rules.repository';

@Injectable()
export class DeleteEstablishmentRulesUseCase {
  constructor(
    @Inject('EstablishmentRulesRepository')
    private readonly repository: EstablishmentRulesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
