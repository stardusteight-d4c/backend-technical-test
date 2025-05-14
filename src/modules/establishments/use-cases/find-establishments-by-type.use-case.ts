import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class FindEstablishmentsByTypeUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,
  ) {}

  async execute(type: string): Promise<Establishment[]> {
    return this.repository.findByType(type);
  }
}
