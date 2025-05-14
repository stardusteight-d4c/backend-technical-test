import { Global, Module } from '@nestjs/common';
import { DynamoDbModule } from './dynamodb/dynamodb.module';

@Global()
@Module({
  imports: [DynamoDbModule],
  exports: [DynamoDbModule],
})
export class CommonModule {}
