import { IsUUID, IsString, Min, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt({ message: 'price must be an integer (in cents)' })
  @Min(0, { message: 'price must be greater than or equal to 0' })
  price: number;

  @IsUUID()
  establishmentId: string;
}
