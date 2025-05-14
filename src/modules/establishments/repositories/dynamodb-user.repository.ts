import { Inject, Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { EstablishmentRepository } from './establishment.repository';
import { Establishment } from '../entities/establishment.entity';
import { DYNAMO_CLIENT } from '../../../common/dynamodb/dynamodb.provider';

@Injectable()
export class DynamoDbEstablishmentRepository
  implements EstablishmentRepository
{
  private readonly tableName = 'Establishments';

  constructor(
    @Inject(DYNAMO_CLIENT)
    private readonly client: DynamoDBDocumentClient,
  ) {}

  async create(establishment: Establishment): Promise<Establishment> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: establishment,
      }),
    );
    return establishment;
  }

  async findById(id: string): Promise<Establishment | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    return (result.Item as Establishment) || null;
  }

  async update(
    id: string,
    data: Partial<Establishment>,
  ): Promise<Establishment> {
    const updateFields = Object.keys(data);
    if (updateFields.length === 0) {
      return this.findById(id) as Promise<Establishment>;
    }

    const expressionParts = updateFields.map((k, i) => `#key${i} = :value${i}`);
    const expressionAttributeNames = updateFields.reduce(
      (acc, key, i) => ({ ...acc, [`#key${i}`]: key }),
      {},
    );
    const expressionAttributeValues = updateFields.reduce(
      (acc, key, i) => ({
        ...acc,
        [`:value${i}`]: data[key as keyof Establishment],
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

    return result.Attributes as Establishment;
  }

  async delete(id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }

  async findAll(): Promise<Establishment[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );
    return (result.Items as Establishment[]) || [];
  }

  async findByType(type: string): Promise<Establishment[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
        FilterExpression: '#type = :type',
        ExpressionAttributeNames: { '#type': 'type' },
        ExpressionAttributeValues: { ':type': type },
      }),
    );
    return (result.Items as Establishment[]) || [];
  }
}
