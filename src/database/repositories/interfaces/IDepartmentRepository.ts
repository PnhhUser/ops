import { IBaseRepository } from './IBaseRepository';

export interface IDepartmentRepository<T> extends IBaseRepository<T> {
  getByName(name: string): Promise<T | null>;
}
