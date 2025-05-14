import { Inject, Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

import { EstablishmentsRulesRepository } from './establishments-rules.repository';
import { DYNAMO_CLIENT } from '../../../common/dynamodb/dynamodb.provider';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

@Injectable()
export class DynamoDbEstablishmentsRulesRepository
  implements EstablishmentsRulesRepository
{
  private readonly tableName = 'EstablishmentsRules';

  constructor(
    @Inject(DYNAMO_CLIENT)
    private readonly client: DynamoDBDocumentClient,
  ) {}

  async create(rule: EstablishmentRules): Promise<EstablishmentRules> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: rule,
      }),
    );
    return rule;
  }

  async findByEstablishmentId(
    establishmentId: string,
  ): Promise<EstablishmentRules | null> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
        FilterExpression: 'establishmentId = :establishmentId',
        ExpressionAttributeValues: {
          ':establishmentId': establishmentId,
        },
        Limit: 1,
      }),
    );

    if (!result.Items || result.Items.length === 0) return null;
    return result.Items[0] as EstablishmentRules;
  }

  async update(
    id: string,
    rule: Partial<EstablishmentRules>,
  ): Promise<EstablishmentRules> {
    const updateFields = Object.keys(rule);
    if (updateFields.length === 0) {
      throw new Error('No fields provided to update');
    }

    const expressionParts = updateFields.map((k, i) => `#key${i} = :value${i}`);
    const expressionAttributeNames = updateFields.reduce(
      (acc, key, i) => ({ ...acc, [`#key${i}`]: key }),
      {},
    );
    const expressionAttributeValues = updateFields.reduce(
      (acc, key, i) => ({
        ...acc,
        [`:value${i}`]: rule[key as keyof EstablishmentRules],
      }),
      {},
    );

    const result = await this.client.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${expressionParts.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }),
    );

    return result.Attributes as EstablishmentRules;
  }

  async delete(id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }
}
