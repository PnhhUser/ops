import { Repository, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IBaseRepository } from './interfaces/IBaseRepository';

@Injectable()
export class BaseRepository<T extends { id: number }>
  implements IBaseRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async getById(id: number): Promise<T | null> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async add(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected;
  }

  async update(entity: T): Promise<void> {
    await this.repository.save(entity);
  }
}
