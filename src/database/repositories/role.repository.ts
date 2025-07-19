import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { BaseRepository } from './base.repository';
import { IRoleRepository } from './interfaces/IRoleRepository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RoleRepository
  extends BaseRepository<RoleEntity>
  implements IRoleRepository<RoleEntity>
{
  constructor(@InjectRepository(RoleEntity) repo: Repository<RoleEntity>) {
    super(repo);
  }

  async getByKey(key: string): Promise<RoleEntity | null> {
    return await this.repository.findOneBy({ key });
  }
}
