import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from '../repositories/establishment.repository';

@Injectable()
export class DeleteEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Establishment ${id} not found`);
    }
    await this.repository.delete(id);
  }
}
