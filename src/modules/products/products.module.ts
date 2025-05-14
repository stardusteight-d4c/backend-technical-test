import { Module } from '@nestjs/common';

import {
  CreateProductUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  ListProductsUseCase,
} from './use-cases';

import { ProductController } from './controller/product.controller';
import { DynamoDbProductsRepository } from './repositories/dynamodb-products.repository';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ListProductsUseCase,
    {
      provide: 'ProductRepository',
      useClass: DynamoDbProductsRepository,
    },
  ],
})
export class ProductsModule {}
