import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { BaseRepository } from './base.repository';
import { IRoleRepository } from './interfaces/IRoleRepository';
import { Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
@Injectable()
export class RoleRepository
  extends BaseRepository<RoleEntity>
  implements IRoleRepository<RoleEntity>
{
  constructor(
    @InjectRepository(RoleEntity) repo: Repository<RoleEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
  ) {
    super(repo);
  }

  async getByKey(key: string): Promise<RoleEntity | null> {
    return await this.repository.findOneBy({ key });
  }

  async getAllExcept(roleKey: string): Promise<RoleEntity[]> {
    return this.repository.find({
      where: { key: Not(roleKey) },
    });
  }

  async countAccountsUsingRole(roleId: number): Promise<number> {
    return this.accountRepo.count({
      where: { role: { id: roleId } },
    });
  }
}
