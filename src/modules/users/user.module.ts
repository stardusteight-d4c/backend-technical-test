import { Module } from '@nestjs/common';

import {
  CreateUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUsersUseCase,
} from './use-cases';

import { DynamoDbUserRepository } from './repositories/dynamodb-user.repository';
import { UserController } from './controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    {
      provide: 'UserRepository',
      useClass: DynamoDbUserRepository,
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: DynamoDbUserRepository,
    },
  ],
})
export class UserModule {}
