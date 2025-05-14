import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class ListEstablishmentsUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,
  ) {}

  async execute(): Promise<Establishment[]> {
    return this.repository.findAll();
  }
}
