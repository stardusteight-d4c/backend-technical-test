import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EstablishmentType } from '../entities/establishment.entity';

export class UpdateEstablishmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  ownerId?: string;

  @IsOptional()
  @IsEnum(EstablishmentType, {
    message: 'type must be either shopping or local',
  })
  type?: EstablishmentType;
}
