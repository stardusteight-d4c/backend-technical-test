import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamoDbModule } from './dynamodb/dynamodb.module';

@Global()
@Module({
  imports: [ConfigModule, DynamoDbModule],
  exports: [DynamoDbModule],
})
export class CommonModule {}
