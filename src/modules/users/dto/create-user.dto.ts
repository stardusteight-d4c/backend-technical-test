import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsEnum(UserType, { message: 'type must be either owner or customer' })
  type: UserType;
}
