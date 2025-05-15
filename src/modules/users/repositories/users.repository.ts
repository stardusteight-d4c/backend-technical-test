import { User } from '../entities/user.entity';

export interface UsersRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
