import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { sanitizeObject } from 'src/shared/utils/sanitize-object';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductsRepository')
    private readonly repository: ProductsRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Product not found');
    const filteredDto = sanitizeObject(dto);
    return this.repository.update(id, filteredDto);
  }
}
