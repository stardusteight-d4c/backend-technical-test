import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from 'src/modules/users/repositories/user.repository';

import { Establishment } from '../entities/establishment.entity';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { CreateEstablishmentDto } from '../dto/create-establishment.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateEstablishmentDto): Promise<Establishment> {
    const user = await this.userRepository.findById(dto.ownerId);

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
