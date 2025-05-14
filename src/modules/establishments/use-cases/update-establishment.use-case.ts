import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class UpdateEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentsRepository')
    private readonly repository: EstablishmentsRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Establishment ${id} not found`);
    }
    const filteredDto = Object.fromEntries(
      Object.entries(dto).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );
    return this.repository.update(id, filteredDto);
  }
}
