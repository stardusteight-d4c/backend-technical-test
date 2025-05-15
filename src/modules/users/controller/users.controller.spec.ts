import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
} from '../use-cases';
import { InMemoryUsersRepository } from '../../../common/testing/in-memory-users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserType } from '../entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let repository: InMemoryUsersRepository;

  beforeEach(async () => {
    repository = new InMemoryUsersRepository();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        ListUsersUseCase,
        {
          provide: 'UsersRepository',
          useValue: repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        type: UserType.CUSTOMER,
      };

      const result = await controller.create(createUserDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(createUserDto.name);
      expect(result.email).toBe(createUserDto.email);
      expect(result.type).toBe(createUserDto.type);
    });

    it('should not create a user with duplicate email', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        type: UserType.CUSTOMER,
      };

      await controller.create(createUserDto);

      await expect(controller.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        type: UserType.CUSTOMER,
      };

      const created = await controller.create(createUserDto);
      const found = await controller.findOne(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should throw NotFoundException when user not found', async () => {
      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        type: UserType.CUSTOMER,
      };

      const created = await controller.create(createUserDto);

      const updateUserDto: UpdateUserDto = {
        name: 'John Updated',
      };

      const updated = await controller.update(created.id, updateUserDto);

      expect(updated).toBeDefined();
      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(updateUserDto.name);
      expect(updated.email).toBe(created.email);
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'John Updated',
      };

      await expect(
        controller.update('non-existent-id', updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        type: UserType.CUSTOMER,
      };

      const created = await controller.create(createUserDto);
      await controller.remove(created.id);

      await expect(controller.findOne(created.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when deleting non-existent user', async () => {
      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          type: UserType.CUSTOMER,
        },
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          type: UserType.OWNER,
        },
      ];

      for (const user of users) {
        await controller.create(user);
      }

      const result = await controller.findAll();

      expect(result).toBeDefined();
      expect(result).toHaveLength(users.length);
      expect(result[0].name).toBe(users[0].name);
      expect(result[1].name).toBe(users[1].name);
    });

    it('should return empty array when no users exist', async () => {
      const result = await controller.findAll();

      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });
  });
});
