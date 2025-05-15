import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentsRulesController } from './establishments-rules.controller';
import {
  CreateEstablishmentRulesUseCase,
  DeleteEstablishmentRulesUseCase,
  GetEstablishmentRulesByEstablishmentIdUseCase,
  UpdateEstablishmentRulesUseCase,
} from '../use-cases';
import { InMemoryEstablishmentsRulesRepository } from '../../../common/testing/in-memory-establishments-rules.repository';
import { InMemoryEstablishmentsRepository } from '../../../common/testing/in-memory-establishments.repository';
import { InMemoryUsersRepository } from '../../../common/testing/in-memory-users.repository';
import { CreateEstablishmentRulesDto } from '../dto/create-establishment-rules.dto';
import { UpdateEstablishmentRulesDto } from '../dto/update-establishment-rules.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../../users/entities/user.entity';
import { EstablishmentType } from '../../establishments/entities/establishment.entity';

describe('EstablishmentsRulesController', () => {
  let controller: EstablishmentsRulesController;
  let repository: InMemoryEstablishmentsRulesRepository;
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let usersRepository: InMemoryUsersRepository;
  let establishmentId: string;

  beforeEach(async () => {
    repository = new InMemoryEstablishmentsRulesRepository();
    establishmentsRepository = new InMemoryEstablishmentsRepository();
    usersRepository = new InMemoryUsersRepository();

    // Create a test owner user
    const ownerUser = {
      id: uuidv4(),
      name: 'Test Owner',
      email: 'owner@test.com',
      type: UserType.OWNER,
    };
    await usersRepository.create(ownerUser);

    // Create a test establishment
    const establishment = {
      id: uuidv4(),
      name: 'Test Establishment',
      ownerId: ownerUser.id,
      type: EstablishmentType.LOCAL,
    };
    await establishmentsRepository.create(establishment);
    establishmentId = establishment.id;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsRulesController],
      providers: [
        CreateEstablishmentRulesUseCase,
        GetEstablishmentRulesByEstablishmentIdUseCase,
        UpdateEstablishmentRulesUseCase,
        DeleteEstablishmentRulesUseCase,
        {
          provide: 'EstablishmentsRulesRepository',
          useValue: repository,
        },
        {
          provide: 'EstablishmentsRepository',
          useValue: establishmentsRepository,
        },
        {
          provide: 'UsersRepository',
          useValue: usersRepository,
        },
      ],
    }).compile();

    controller = module.get<EstablishmentsRulesController>(EstablishmentsRulesController);
  });

  afterEach(() => {
    repository.clear();
    establishmentsRepository.clear();
    usersRepository.clear();
  });

  describe('create', () => {
    it('should create establishment rules', async () => {
      const createDto: CreateEstablishmentRulesDto = {
        establishmentId: establishmentId,
        picturesLimit: 5,
        videoLimit: 2,
      };

      const result = await controller.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.establishmentId).toBe(createDto.establishmentId);
      expect(result.picturesLimit).toBe(createDto.picturesLimit);
      expect(result.videoLimit).toBe(createDto.videoLimit);
    });

    it('should throw NotFoundException when establishment does not exist', async () => {
      const createDto: CreateEstablishmentRulesDto = {
        establishmentId: 'non-existent-id',
        picturesLimit: 5,
        videoLimit: 2,
      };

      await expect(controller.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEstablishment', () => {
    it('should return rules by establishment id', async () => {
      const createDto: CreateEstablishmentRulesDto = {
        establishmentId: establishmentId,
        picturesLimit: 5,
        videoLimit: 2,
      };

      const created = await controller.create(createDto);
      const found = await controller.findByEstablishment(created.establishmentId);

      expect(found).toBeDefined();
      expect(found).not.toBeNull();
      if (found) {
        expect(found.id).toBe(created.id);
        expect(found.establishmentId).toBe(created.establishmentId);
      }
    });

    it('should throw NotFoundException when establishment does not exist', async () => {
      await expect(controller.findByEstablishment('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update establishment rules', async () => {
      const createDto: CreateEstablishmentRulesDto = {
        establishmentId: establishmentId,
        picturesLimit: 5,
        videoLimit: 2,
      };

      const created = await controller.create(createDto);

      const updateDto: UpdateEstablishmentRulesDto = {
        picturesLimit: 10,
      };

      const updated = await controller.update(created.id, updateDto);

      expect(updated).toBeDefined();
      expect(updated.id).toBe(created.id);
      expect(updated.picturesLimit).toBe(updateDto.picturesLimit);
      expect(updated.videoLimit).toBe(created.videoLimit);
    });

    it('should throw error when updating non-existent rules', async () => {
      const updateDto: UpdateEstablishmentRulesDto = {
        picturesLimit: 10,
      };

      await expect(
        controller.update('non-existent-id', updateDto),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete establishment rules', async () => {
      const createDto: CreateEstablishmentRulesDto = {
        establishmentId: establishmentId,
        picturesLimit: 5,
        videoLimit: 2,
      };

      const created = await controller.create(createDto);
      await controller.delete(created.id);

      const found = await controller.findByEstablishment(created.establishmentId);
      expect(found).toBeNull();
    });
  });
}); 