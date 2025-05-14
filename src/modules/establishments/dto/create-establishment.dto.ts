// create-establishment.dto.ts
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { EstablishmentType } from '../entities/establishment.entity';

export class CreateEstablishmentDto {
  @IsString()
  name: string;

  @IsUUID()
  ownerId: string;

  @IsEnum(EstablishmentType, {
    message: 'type must be either shopping or local',
  })
  type: EstablishmentType;
}
