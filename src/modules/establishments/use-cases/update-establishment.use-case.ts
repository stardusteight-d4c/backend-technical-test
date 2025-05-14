import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';

@Injectable()
export class UpdateEstablishmentUseCase {
  constructor(
    @Inject('EstablishmentRepository')
    private readonly repository: EstablishmentRepository,
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
