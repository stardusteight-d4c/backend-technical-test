import { Inject, Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { DYNAMO_CLIENT } from '../../../common/dynamodb/dynamodb.provider';

@Injectable()
export class DynamoDbUsersRepository implements UsersRepository {
  private readonly tableName = 'Users';

  constructor(
    @Inject(DYNAMO_CLIENT)
    private readonly client: DynamoDBDocumentClient,
  ) {}

  async create(user: User): Promise<User> {
    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: user,
      }),
    );
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
    return (result.Item as User) || null;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updateFields = Object.keys(user);
  
    if (updateFields.length === 0) {
      return this.findById(id) as Promise<User>;
    }
  
    const expressionParts = updateFields.map((key, i) => `#key${i} = :value${i}`);
    const expressionAttributeNames = updateFields.reduce((acc, key, i) => {
      acc[`#key${i}`] = key;
      return acc;
    }, {});
  
    const expressionAttributeValues = updateFields.reduce((acc, key, i) => {
      acc[`:value${i}`] = user[key as keyof User] !== undefined ? user[key as keyof User] : null;
      return acc;
    }, {});
  
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
  
    return result.Attributes as User;  
  }
  

  async delete(id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      }),
    );
  }

  async findAll(): Promise<User[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );
    return (result.Items as User[]) || [];
  }
}
