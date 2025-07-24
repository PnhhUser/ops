import { AccountEntity } from 'src/database/entities/account.entity';
import { CreateAccountDTO } from '../dto/create-account.dto';
import { UpdateAccountDTO } from '../dto/update-account.dto';

export interface IAccountService {
  getAccounts(): Promise<AccountEntity[] | null>;

  getAccount(accountId: number): Promise<AccountEntity | null>;

  addAccount(newAccount: CreateAccountDTO): Promise<void>;

  updateAccount(updateAccount: UpdateAccountDTO): Promise<void>;

  removeAccount(accountId: number): Promise<void>;

  setOffline(accountId: number): Promise<void>;
}
