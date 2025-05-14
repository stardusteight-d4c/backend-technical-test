import { Module } from '@nestjs/common';

import {
  CreateEstablishmentUseCase,
  GetEstablishmentUseCase,
  UpdateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  ListEstablishmentsUseCase,
  FindEstablishmentsByTypeUseCase,
} from './use-cases';

import { EstablishmentController } from './controller/establishment.controller';
import { DynamoDbEstablishmentRepository } from './repositories/dynamodb-user.repository';
import { DynamoDbUserRepository } from '../users/repositories/dynamodb-user.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule], 
  controllers: [EstablishmentController],
  providers: [
    CreateEstablishmentUseCase,
    GetEstablishmentUseCase,
    UpdateEstablishmentUseCase,
    DeleteEstablishmentUseCase,
    ListEstablishmentsUseCase,
    FindEstablishmentsByTypeUseCase,
    {
      provide: 'EstablishmentRepository',
      useClass: DynamoDbEstablishmentRepository,
    },
  ],
})
export class EstablishmentModule {}

