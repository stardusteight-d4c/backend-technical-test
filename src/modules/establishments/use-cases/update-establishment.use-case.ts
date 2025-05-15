import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstablishmentsRepository } from '../repositories/establishments.repository';
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto';
import { Establishment } from '../entities/establishment.entity';
import { sanitizeObject } from '../../../shared/utils/sanitize-object';

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
    const filteredDto = sanitizeObject(dto);
    return this.repository.update(id, filteredDto);
  }
}
