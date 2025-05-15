import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { sanitizeObject } from '../../../shared/utils/sanitize-object';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const filteredDto = sanitizeObject(dto);
    return this.userRepository.update(id, filteredDto);
  }
}
