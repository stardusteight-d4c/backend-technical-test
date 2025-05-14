import { Module } from '@nestjs/common';

import {
  CreateEstablishmentUseCase,
  GetEstablishmentUseCase,
  UpdateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  ListEstablishmentsUseCase,
  FindEstablishmentsByTypeUseCase,
} from './use-cases';

import { EstablishmentsController } from './controller/establishments.controller';
import { DynamoDbEstablishmentsRepository } from './repositories/dynamodb-establishments.repository';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [UsersModule],
  controllers: [EstablishmentsController],
  providers: [
    CreateEstablishmentUseCase,
    GetEstablishmentUseCase,
    UpdateEstablishmentUseCase,
    DeleteEstablishmentUseCase,
    ListEstablishmentsUseCase,
    FindEstablishmentsByTypeUseCase,
    {
      provide: 'EstablishmentsRepository',
      useClass: DynamoDbEstablishmentsRepository,
    },
  ],
  exports: [
    {
      provide: 'EstablishmentsRepository',
      useClass: DynamoDbEstablishmentsRepository,
    },
  ],
})
export class EstablishmentsModule {}
