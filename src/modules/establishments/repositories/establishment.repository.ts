import { Establishment } from '../entities/establishment.entity';

export interface EstablishmentRepository {
  create(establishment: Establishment): Promise<Establishment>;
  findById(id: string): Promise<Establishment | null>;
  update(
    id: string,
    establishment: Partial<Establishment>,
  ): Promise<Establishment>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Establishment[]>;
  findByType(type: string): Promise<Establishment[]>;
}
