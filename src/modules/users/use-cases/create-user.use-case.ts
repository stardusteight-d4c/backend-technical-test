import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...dto,
    };
    return this.userRepository.create(user);
  }
}
