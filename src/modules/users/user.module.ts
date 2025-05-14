import { Module } from '@nestjs/common';

import {
  CreateUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUsersUseCase,
} from './use-cases';

import { DynamoDbUsersRepository } from './repositories/dynamodb-users.repository';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    {
      provide: 'UsersRepository',
      useClass: DynamoDbUsersRepository,
    },
  ],
  exports: [
    {
      provide: 'UsersRepository',
      useClass: DynamoDbUsersRepository,
    },
  ],
})
export class UsersModule {}
