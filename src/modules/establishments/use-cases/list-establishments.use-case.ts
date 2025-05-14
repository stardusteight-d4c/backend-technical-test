import { Inject, Injectable } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class ListEstablishmentsUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,
  ) {}

  async execute(): Promise<Establishment[]> {
    return this.repository.findAll();
  }
}
