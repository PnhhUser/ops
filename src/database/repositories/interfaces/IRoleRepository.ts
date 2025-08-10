import { IBaseRepository } from './IBaseRepository';

export interface IRoleRepository<T> extends IBaseRepository<T> {
  getByKey(key: string): Promise<T | null>;

  getAllExcept(roleKey: string): Promise<T[]>;

  countAccountsUsingRole(roleId: number): Promise<number>;
}
