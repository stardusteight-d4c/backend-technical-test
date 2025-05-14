import { Product } from '../entities/product.entity';

export interface ProductsRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Product[]>;
}
