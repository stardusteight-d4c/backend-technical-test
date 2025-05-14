import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const DYNAMO_CLIENT = 'DYNAMO_CLIENT';

export const dynamoDbProvider = {
  provide: DYNAMO_CLIENT,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const client = new DynamoDBClient({
      region: config.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    });

    const docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });

    return docClient;
  },
};
