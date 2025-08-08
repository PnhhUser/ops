import { AccountEntity } from 'src/database/entities/account.entity';
import { IBaseRepository } from './IBaseRepository';

export interface IEmployeeRepository<T> extends IBaseRepository<T> {
  getByEmail(email: string): Promise<T | null>;

  getEmployeesByAccountId(accountId: number): Promise<T[]>;

  getAllWithRelations(): Promise<T[]>;

  getAvailableAccounts(): Promise<AccountEntity[]>;

  getAvailableAccountsById(employeeId: number): Promise<AccountEntity[]>;
}
