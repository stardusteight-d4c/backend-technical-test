import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserType, { message: 'type must be either owner or customer' })
  type?: UserType;
}
