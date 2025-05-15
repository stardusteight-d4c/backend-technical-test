import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductUseCase,
  ListProductsUseCase,
  UpdateProductUseCase,
} from '../use-cases';
import { InMemoryProductsRepository } from '../../../common/testing/in-memory-products.repository';
import { InMemoryEstablishmentsRepository } from '../../../common/testing/in-memory-establishments.repository';
import { InMemoryUsersRepository } from '../../../common/testing/in-memory-users.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../../users/entities/user.entity';
import { EstablishmentType } from '../../establishments/entities/establishment.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let repository: InMemoryProductsRepository;
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let usersRepository: InMemoryUsersRepository;
  let establishmentId: string;

  beforeEach(async () => {
    repository = new InMemoryProductsRepository();
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
      controllers: [ProductsController],
      providers: [
        CreateProductUseCase,
        GetProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        ListProductsUseCase,
        {
          provide: 'ProductsRepository',
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

    controller = module.get<ProductsController>(ProductsController);
  });

  afterEach(() => {
    repository.clear();
    establishmentsRepository.clear();
    usersRepository.clear();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        price: 1000,
        establishmentId: establishmentId,
      };

      const result = await controller.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(createDto.name);
      expect(result.price).toBe(createDto.price);
      expect(result.establishmentId).toBe(createDto.establishmentId);
    });

    it('should throw NotFoundException when establishment does not exist', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        price: 1000,
        establishmentId: 'non-existent-id',
      };

      await expect(controller.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a product by id', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        price: 1000,
        establishmentId: establishmentId,
      };

      const created = await controller.create(createDto);
      const found = await controller.findById(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });

    it('should throw NotFoundException when product not found', async () => {
      await expect(controller.findById('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        price: 1000,
        establishmentId: establishmentId,
      };

      const created = await controller.create(createDto);

      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 2000,
      };

      const updated = await controller.update(created.id, updateDto);

      expect(updated).toBeDefined();
      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(updateDto.name);
      expect(updated.price).toBe(updateDto.price);
      expect(updated.establishmentId).toBe(created.establishmentId);
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      await expect(
        controller.update('non-existent-id', updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        price: 1000,
        establishmentId: establishmentId,
      };

      const created = await controller.create(createDto);
      await controller.delete(created.id);

      await expect(controller.findById(created.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      await expect(controller.delete('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('list', () => {
    it('should return all products', async () => {
      const products = [
        {
          name: 'Product 1',
          price: 1000,
          establishmentId: establishmentId,
        },
        {
          name: 'Product 2',
          price: 2000,
          establishmentId: establishmentId,
        },
      ];

      for (const product of products) {
        await controller.create(product);
      }

      const result = await controller.list();

      expect(result).toBeDefined();
      expect(result).toHaveLength(products.length);
      expect(result[0].name).toBe(products[0].name);
      expect(result[1].name).toBe(products[1].name);
    });

    it('should return empty array when no products exist', async () => {
      const result = await controller.list();

      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });
  });
}); 