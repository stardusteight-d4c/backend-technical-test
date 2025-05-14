import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class GetEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,
  ) {}

  async execute(id: string): Promise<Establishment> {
    const establishment = await this.repository.findById(id);
    if (!establishment) {
      throw new NotFoundException(`Establishment ${id} not found`);
    }
    return establishment;
  }
}
