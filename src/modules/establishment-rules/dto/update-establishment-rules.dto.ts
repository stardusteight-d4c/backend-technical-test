import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateEstablishmentRulesDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  picturesLimit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  videoLimit?: number;
}
