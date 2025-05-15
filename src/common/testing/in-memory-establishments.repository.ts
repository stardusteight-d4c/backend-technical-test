import { InMemoryRepository } from './in-memory.repository';
import { Establishment } from '../../modules/establishments/entities/establishment.entity';
import { EstablishmentsRepository } from '../../modules/establishments/repositories/establishments.repository';

export class InMemoryEstablishmentsRepository
  extends InMemoryRepository<Establishment>
  implements EstablishmentsRepository
{
  async findByOwnerId(ownerId: string): Promise<Establishment[]> {
    return this.items.filter((item) => item.ownerId === ownerId);
  }

  async findByType(type: string): Promise<Establishment[]> {
    return this.items.filter((item) => item.type === type);
  }
} 