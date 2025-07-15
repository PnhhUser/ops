import { IBaseRepository } from './IBaseRepository';

export interface IPermissionRepository<T> extends IBaseRepository<T> {
  getByKey(key: string): Promise<T | null>;
}
