import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
