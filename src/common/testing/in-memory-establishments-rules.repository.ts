import { InMemoryRepository } from './in-memory.repository';
import { EstablishmentRules } from '../../modules/establishments-rules/entities/establishment-rule.entity';
import { EstablishmentsRulesRepository } from '../../modules/establishments-rules/repositories/establishments-rules.repository';

export class InMemoryEstablishmentsRulesRepository
  extends InMemoryRepository<EstablishmentRules>
  implements EstablishmentsRulesRepository
{
  async findByEstablishmentId(establishmentId: string): Promise<EstablishmentRules | null> {
    return this.items.find((item) => item.establishmentId === establishmentId) || null;
  }
} 