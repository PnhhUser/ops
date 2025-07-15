import { Inject, Injectable } from '@nestjs/common';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { IAccountService } from './interface/IAccountService';
import { IAccountRepository } from 'src/database/repositories/interfaces/IAccountRepository';
import { AccountEntity } from 'src/database/entities/account.entity';
import { IRoleRepository } from 'src/database/repositories/interfaces/IRoleRepository';
import { RoleEntity } from 'src/database/entities/role.entity';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository<AccountEntity>,
    @Inject('IRoleRepository')
    private readonly RoleRepository: IRoleRepository<RoleEntity>,
  ) {}

  async getAccounts() {
    return await this.accountRepository.getAll();
  }

  async addAccount(dto: CreateAccountDTO) {
    const username = await this.accountRepository.getByUsername(dto.username);

    if (username) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.account.ACCOUNT_USERNAME_EXISTS,
      );
    }

    const role = await this.RoleRepository.getById(dto.roleId);

    if (!role) {
      throw ExceptionSerializer.badRequest('This role does not exist');
    }

    const create = await CreateAccountDTO.toEntity(dto);

    await this.accountRepository.add(create);
  }

  async updateAccount(dto: UpdateAccountDTO) {
    const existedAccount = await this.accountRepository.getById(dto.accountId);

    if (!existedAccount) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.account.ACCOUNT_NOT_FOUND,
      );
    }

    const duplicatedUsername = await this.accountRepository.getByUsername(
      dto.username,
    );

    if (duplicatedUsername && duplicatedUsername.id !== dto.accountId) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.account.ACCOUNT_USERNAME_EXISTS,
      );
    }

    const role = await this.RoleRepository.getById(dto.roleId);

    if (!role) {
      throw ExceptionSerializer.badRequest('This role does not exist');
    }

    const update = await UpdateAccountDTO.toEntity(dto);

    await this.accountRepository.update(update);
  }

  async removeAccount(accountId: number) {
    if (typeof accountId !== 'number') {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.account.ACCOUNT_ID_NOT_INTEGER,
      );
    }

    if (accountId <= 0) {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.account.ACCOUNT_ID_TOO_SMALL,
      );
    }

    const existedAccount = await this.accountRepository.getById(accountId);

    if (!existedAccount) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.account.ACCOUNT_NOT_FOUND,
      );
    }

    await this.accountRepository.delete(existedAccount.id);
  }

  async setOffline(accountId: number): Promise<void> {
    const account = await this.accountRepository.getById(accountId);
    if (account) {
      account.lastSeen = null;
      await this.accountRepository.update(account);
    }
  }
}
