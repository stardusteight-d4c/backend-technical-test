import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingByEmail = await this.userRepository.findByEmail(dto.email);

    if (existingByEmail) {
      throw new ConflictException('Email already in use');
    }

    const id = randomUUID();

    const existingById = await this.userRepository.findById(id);
    if (existingById) {
      throw new ConflictException('User ID already exists');
    }

    const user: User = {
      id,
      ...dto,
    };

    return this.userRepository.create(user);
  }
}
