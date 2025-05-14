import { Module } from '@nestjs/common';

import {
  CreateEstablishmentRulesUseCase,
  GetEstablishmentRulesByEstablishmentIdUseCase,
  UpdateEstablishmentRulesUseCase,
  DeleteEstablishmentRulesUseCase,
} from './use-cases';

import { EstablishmentsRulesController } from './controller/establishments-rules.controller';
import { DynamoDbEstablishmentsRulesRepository } from './repositories/dynamodb-establishments-rules.repository';
import { EstablishmentsModule } from '../establishments/establishments.module';

@Module({
  imports: [EstablishmentsModule],
  controllers: [EstablishmentsRulesController],
  providers: [
    CreateEstablishmentRulesUseCase,
    GetEstablishmentRulesByEstablishmentIdUseCase,
    UpdateEstablishmentRulesUseCase,
    DeleteEstablishmentRulesUseCase,
    {
      provide: 'EstablishmentsRulesRepository',
      useClass: DynamoDbEstablishmentsRulesRepository,
    },
  ],
})
export class EstablishmentsRulesModule {}
