import { IBaseRepository } from './IBaseRepository';

export interface IPositionRepository<T> extends IBaseRepository<T> {
  getByName(name: string): Promise<T | null>;

  getByKey(key: string): Promise<T | null>;
}
