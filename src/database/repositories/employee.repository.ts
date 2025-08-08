import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { IEmployeeRepository } from './interfaces/IEmployeeRepository';
import { AccountEntity } from '../entities/account.entity';
import { IAccountRepository } from './interfaces/IAccountRepository';
@Injectable()
export class EmployeeRepository
  extends BaseRepository<EmployeeEntity>
  implements IEmployeeRepository<EmployeeEntity>
{
  constructor(
    @InjectRepository(EmployeeEntity) repo: Repository<EmployeeEntity>,
    @Inject('IAccountRepository')
    private readonly accountRepo: IAccountRepository<AccountEntity>,
  ) {
    super(repo);
  }

  override async getById(id: number): Promise<EmployeeEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relations: { account: true, position: { department: true } },
    });
  }

  async getByEmail(email: string): Promise<EmployeeEntity | null> {
    return await this.repository.findOneBy({ email });
  }

  async getEmployeesByAccountId(accountId: number): Promise<EmployeeEntity[]> {
    return await this.repository.find({
      select: ['id'],
      where: {
        account: { id: accountId },
      },
      relations: ['account'],
    });
  }

  async getAllWithRelations(): Promise<EmployeeEntity[]> {
    return this.repository.find({
      relations: {
        position: {
          department: true,
        },
        account: true,
      },
    });
  }

  async getAvailableAccounts(): Promise<AccountEntity[]> {
    const allAccounts = await this.accountRepo.getAll();

    const employees = await this.repository.find({
      relations: { account: true },
    });

    const usedAccountIds = new Set(
      employees
        .map((e) => e.account?.id)
        .filter((id): id is number => id !== null && id !== undefined),
    );

    return allAccounts.filter((account) => !usedAccountIds.has(account.id));
  }

  async getAvailableAccountsById(employeeId: number): Promise<AccountEntity[]> {
    let currentAccountId: number | null = null;
    if (employeeId) {
      const currentEmployee = await this.repository.findOne({
        where: { id: employeeId },
        relations: ['account'],
      });
      currentAccountId = currentEmployee?.account?.id || null;
    }

    const accounts = await this.accountRepo.getAll();

    const empWithAccounts = await this.repository.find({
      where: { account: Not(IsNull()) },
      relations: {
        account: true,
      },
    });

    const usedAccountIds = new Set(empWithAccounts.map((e) => e.account?.id));

    const availableAccounts = accounts.filter(
      (account) =>
        !usedAccountIds.has(account.id) ||
        (currentAccountId !== null && account.id === currentAccountId),
    );

    return availableAccounts;
  }
}
