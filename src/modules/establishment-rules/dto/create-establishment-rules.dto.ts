import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateEstablishmentRulesDto {
  @IsUUID()
  establishmentId: string;

  @IsInt()
  @Min(0)
  picturesLimit: number;

  @IsInt()
  @Min(0)
  videoLimit: number;
}
