import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { UsersRepository } from 'src/modules/users/repositories/users.repository';

import { Establishment } from '../entities/establishment.entity';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,

    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(dto: CreateEstablishmentDto): Promise<Establishment> {
    const user = await this.usersRepository.findById(dto.ownerId);

    if (!user) {
      throw new NotFoundException(`Owner with ID ${dto.ownerId} not found`);
    }

    if (user.type !== 'owner') {
      throw new BadRequestException(
        'Only users of type "owner" can create establishments',
      );
    }

    const establishment: Establishment = {
      id: uuidv4(),
      ...dto,
    };

    return this.repository.create(establishment);
  }
}
