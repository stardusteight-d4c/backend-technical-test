import { User } from '../../modules/users/entities/user.entity';
import { UsersRepository } from '../../modules/users/repositories/users.repository';
import { InMemoryRepository } from './in-memory.repository';

export class InMemoryUsersRepository extends InMemoryRepository<User> implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return this.items.find(user => user.email === email) || null;
  }
} 