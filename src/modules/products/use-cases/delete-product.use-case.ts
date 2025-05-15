import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductsRepository')
    private readonly repository: ProductsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.repository.delete(id);
  }
}
