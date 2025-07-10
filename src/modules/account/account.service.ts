import { Injectable } from '@nestjs/common';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { AccountRepository } from 'src/database/repositories/account.repository';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getAccounts() {
    return await this.accountRepository.getAll();
  }

  async addAccount(newAccount: CreateAccountDTO) {
    const existed = await this.accountRepository.accountExist(
      newAccount.username,
    );

    if (existed) {
      throw ExceptionSerializer.conflict('Username already exists');
    }
    const account = await CreateAccountDTO.toEntity(newAccount);

    await this.accountRepository.add(account);
  }

  async updateAccount(account: UpdateAccountDTO) {
    const existedAccount = await this.accountRepository.getById(
      account.accountId,
    );

    if (!existedAccount) {
      throw ExceptionSerializer.notFound('Account not found');
    }

    const duplicatedUsername = await this.accountRepository.accountExist(
      account.username,
    );

    if (duplicatedUsername && duplicatedUsername.id !== account.accountId) {
      throw ExceptionSerializer.conflict('Username already exists');
    }

    const newAccount = await UpdateAccountDTO.toEntity(account);

    await this.accountRepository.update(newAccount);
  }

  async removeAccount(accountId: number) {
    const existedAccount = await this.accountRepository.getById(accountId);

    if (!existedAccount) {
      throw ExceptionSerializer.notFound('Account not found');
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
