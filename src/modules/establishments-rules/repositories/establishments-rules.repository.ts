import { EstablishmentRules } from '../entities/establishment-rule.entity';

export interface EstablishmentsRulesRepository {
  create(rule: EstablishmentRules): Promise<EstablishmentRules>;
  findByEstablishmentId(
    establishmentId: string,
  ): Promise<EstablishmentRules | null>;
  update(
    id: string,
    data: Partial<EstablishmentRules>,
  ): Promise<EstablishmentRules>;
  delete(id: string): Promise<void>;
}
