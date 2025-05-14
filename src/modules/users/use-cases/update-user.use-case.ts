import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const filteredDto = Object.fromEntries(
      Object.entries(dto).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );
    return this.userRepository.update(id, filteredDto);
  }
}
