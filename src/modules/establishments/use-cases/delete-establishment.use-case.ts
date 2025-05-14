import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';

@Injectable()
export class DeleteEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Establishment ${id} not found`);
    }
    await this.repository.delete(id);
  }
}
