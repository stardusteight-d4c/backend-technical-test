import { InMemoryRepository } from './in-memory.repository';
import { Product } from '../../modules/products/entities/product.entity';
import { ProductsRepository } from '../../modules/products/repositories/products.repository';

export class InMemoryProductsRepository
  extends InMemoryRepository<Product>
  implements ProductsRepository
{
  async findByEstablishmentId(establishmentId: string): Promise<Product[]> {
    return this.items.filter((item) => item.establishmentId === establishmentId);
  }
} 