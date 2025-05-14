import { Inject, Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Product } from '../entities/product.entity';
import { DYNAMO_CLIENT } from '../../../common/dynamodb/dynamodb.provider';
import { ProductsRepository } from './products.repository';

@Injectable()
export class DynamoDbProductsRepository implements ProductsRepository {
  private readonly tableName = 'Products';

  constructor(
    @Inject(DYNAMO_CLIENT)
    private readonly client: DynamoDBDocumentClient,
  ) {}

  async create(product: Product): Promise<Product> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: product,
      }),
    );
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    return (result.Item as Product) || null;
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updateFields = Object.keys(product);
    const expressionParts = updateFields.map((k, i) => `#k${i} = :v${i}`);
    const ExpressionAttributeNames = Object.fromEntries(
      updateFields.map((k, i) => [`#k${i}`, k]),
    );
    const ExpressionAttributeValues = Object.fromEntries(
      updateFields.map((k, i) => [`:v${i}`, product[k as keyof Product]]),
    );

    const result = await this.client.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${expressionParts.join(', ')}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }),
    );

    return result.Attributes as Product;
  }

  async delete(id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }

  async findAll(): Promise<Product[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );
    return (result.Items as Product[]) || [];
  }
}
