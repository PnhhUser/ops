import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    repo: Repository<AccountEntity>,
  ) {
    super(repo);
  }

  async accountExist(username: string): Promise<AccountEntity | null> {
    return await this.repository.findOneBy({ username });
  }
}
