import { Module } from '@nestjs/common';

import {
  CreateProductUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  ListProductsUseCase,
} from './use-cases';

import { ProductsController } from './controller/products.controller';
import { DynamoDbProductsRepository } from './repositories/dynamodb-products.repository';
import { EstablishmentsModule } from '../establishments/establishments.module';

@Module({
  imports: [EstablishmentsModule],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ListProductsUseCase,
    {
      provide: 'ProductsRepository',
      useClass: DynamoDbProductsRepository,
    },
  ],
})
export class ProductsModule {}
