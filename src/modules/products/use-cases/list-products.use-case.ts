import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
