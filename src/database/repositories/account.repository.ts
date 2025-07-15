import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { BaseRepository } from './base.repository';
import { IAccountRepository } from './interfaces/IAccountRepository';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements IAccountRepository<AccountEntity>
{
  constructor(
    @InjectRepository(AccountEntity)
    repo: Repository<AccountEntity>,
  ) {
    super(repo);
  }

  async getByUsername(username: string): Promise<AccountEntity | null> {
    return await this.repository.findOneBy({ username });
  }
}
