export class InMemoryRepository<T extends { id: string }> {
  protected items: T[] = [];

  async create(item: T): Promise<T> {
    this.items.push(item);
    return item;
  }

  async findById(id: string): Promise<T | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async findAll(): Promise<T[]> {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }
} 