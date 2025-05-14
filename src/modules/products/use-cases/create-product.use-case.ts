import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { EstablishmentsRepository } from 'src/modules/establishments/repositories/establishments.repository';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductsRepository,

    @Inject('EstablishmentRepository')
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const establishment = await this.establishmentsRepository.findById(
      dto.establishmentId,
    );

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    const product: Product = {
      id: uuidv4(),
      ...dto,
    };

    return this.repository.create(product);
  }
}
