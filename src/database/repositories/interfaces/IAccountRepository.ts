import { IBaseRepository } from './IBaseRepository';

export interface IAccountRepository<T> extends IBaseRepository<T> {
  getByUsername(username: string): Promise<T | null>;
}
