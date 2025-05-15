import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentsController } from './establishments.controller';
import {
  CreateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  GetEstablishmentUseCase,
  ListEstablishmentsUseCase,
  UpdateEstablishmentUseCase,
  FindEstablishmentsByTypeUseCase,
} from '../use-cases';
import { InMemoryEstablishmentsRepository } from '../../../common/testing/in-memory-establishments.repository';
import { InMemoryUsersRepository } from '../../../common/testing/in-memory-users.repository';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { EstablishmentType } from '../entities/establishment.entity';
import { UserType } from '../../users/entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('EstablishmentsController', () => {
  let controller: EstablishmentsController;
  let repository: InMemoryEstablishmentsRepository;
  let usersRepository: InMemoryUsersRepository;
  let ownerUserId: string;

  beforeEach(async () => {
    repository = new InMemoryEstablishmentsRepository();
    usersRepository = new InMemoryUsersRepository();

    // Create a test owner user
    const ownerUser = {
      id: uuidv4(),
      name: 'Test Owner',
      email: 'owner@test.com',
      type: UserType.OWNER,
    };
    await usersRepository.create(ownerUser);
    ownerUserId = ownerUser.id;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsController],
      providers: [
        CreateEstablishmentUseCase,
        GetEstablishmentUseCase,
        UpdateEstablishmentUseCase,
        DeleteEstablishmentUseCase,
        ListEstablishmentsUseCase,
        FindEstablishmentsByTypeUseCase,
        {
          provide: 'EstablishmentsRepository',
          useValue: repository,
        },
        {
          provide: 'UsersRepository',
          useValue: usersRepository,
        },
      ],
    }).compile();

    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  afterEach(() => {
    repository.clear();
    usersRepository.clear();
  });

  describe('create', () => {
    it('should create a new establishment', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: ownerUserId,
        type: EstablishmentType.LOCAL,
      };

      const result = await controller.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(createDto.name);
      expect(result.ownerId).toBe(createDto.ownerId);
      expect(result.type).toBe(createDto.type);
    });

    it('should throw NotFoundException when owner does not exist', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: 'non-existent-id',
        type: EstablishmentType.LOCAL,
      };

      await expect(controller.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when user is not an owner', async () => {
      const customerUser = {
        id: uuidv4(),
        name: 'Test Customer',
        email: 'customer@test.com',
        type: UserType.CUSTOMER,
      };
      await usersRepository.create(customerUser);

      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: customerUser.id,
        type: EstablishmentType.LOCAL,
      };

      await expect(controller.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return an establishment by id', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: ownerUserId,
        type: EstablishmentType.LOCAL,
      };

      const created = await controller.create(createDto);
      const found = await controller.findOne(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should throw NotFoundException when establishment not found', async () => {
      await expect(controller.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an establishment', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: ownerUserId,
        type: EstablishmentType.LOCAL,
      };

      const created = await controller.create(createDto);

      const updateDto: UpdateEstablishmentDto = {
        name: 'Updated Establishment',
      };

      const updated = await controller.update(created.id, updateDto);

      expect(updated).toBeDefined();
      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(updateDto.name);
      expect(updated.ownerId).toBe(created.ownerId);
    });

    it('should throw NotFoundException when updating non-existent establishment', async () => {
      const updateDto: UpdateEstablishmentDto = {
        name: 'Updated Establishment',
      };

      await expect(
        controller.update('non-existent-id', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an establishment', async () => {
      const createDto: CreateEstablishmentDto = {
        name: 'Test Establishment',
        ownerId: ownerUserId,
        type: EstablishmentType.LOCAL,
      };

      const created = await controller.create(createDto);
      await controller.remove(created.id);

      await expect(controller.findOne(created.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when deleting non-existent establishment', async () => {
      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('list', () => {
    it('should return all establishments', async () => {
      const establishments = [
        {
          name: 'Local Shop',
          ownerId: ownerUserId,
          type: EstablishmentType.LOCAL,
        },
        {
          name: 'Shopping Mall',
          ownerId: ownerUserId,
          type: EstablishmentType.SHOPPING,
        },
      ];

      for (const establishment of establishments) {
        await controller.create(establishment);
      }

      const result = await controller.list();

      expect(result).toBeDefined();
      expect(result).toHaveLength(establishments.length);
      expect(result[0].name).toBe(establishments[0].name);
      expect(result[1].name).toBe(establishments[1].name);
    });

    it('should return establishments filtered by type', async () => {
      const establishments = [
        {
          name: 'Local Shop',
          ownerId: ownerUserId,
          type: EstablishmentType.LOCAL,
        },
        {
          name: 'Shopping Mall',
          ownerId: ownerUserId,
          type: EstablishmentType.SHOPPING,
        },
      ];

      for (const establishment of establishments) {
        await controller.create(establishment);
      }

      const result = await controller.list(EstablishmentType.LOCAL);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe(EstablishmentType.LOCAL);
    });

    it('should return empty array when no establishments exist', async () => {
      const result = await controller.list();

      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });
  });
}); 