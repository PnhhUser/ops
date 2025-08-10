import { AccountEntity } from 'src/database/entities/account.entity';
import { CreateAccountDTO } from '../dto/create-account.dto';
import { UpdateAccountDTO } from '../dto/update-account.dto';
import { IJwtPayload } from 'src/modules/auth/interface/IJwtPayload';
import { RoleEntity } from 'src/database/entities/role.entity';

export interface IAccountService {
  getAccounts(): Promise<AccountEntity[] | null>;

  getAccount(accountId: number): Promise<AccountEntity | null>;

  addAccount(newAccount: CreateAccountDTO): Promise<AccountEntity>;

  updateAccount(
    updateAccount: UpdateAccountDTO,
    currentUser: IJwtPayload,
  ): Promise<AccountEntity>;

  removeAccount(accountId: number, currentUser: IJwtPayload): Promise<void>;

  setOffline(accountId: number): Promise<void>;

  getRolesForSelect(currentUser: IJwtPayload): Promise<RoleEntity[]>;
}
