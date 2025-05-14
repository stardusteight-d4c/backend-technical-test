import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class GetEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,
  ) {}

  async execute(id: string): Promise<Establishment> {
    const establishment = await this.repository.findById(id);
    if (!establishment) {
      throw new NotFoundException(`Establishment ${id} not found`);
    }
    return establishment;
  }
}
