import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class FindEstablishmentsByTypeUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,
  ) {}

  async execute(type: string): Promise<Establishment[]> {
    return this.repository.findByType(type);
  }
}
