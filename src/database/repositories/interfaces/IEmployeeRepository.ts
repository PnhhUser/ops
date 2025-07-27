import { IBaseRepository } from './IBaseRepository';

export interface IEmployeeRepository<T> extends IBaseRepository<T> {
  getByEmail(email: string): Promise<T | null>;

  getEmployeesByAccountId(accountId: number): Promise<T[]>;

  getAllWithRelations(): Promise<T[]>;
}
