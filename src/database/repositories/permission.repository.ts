import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IPermissionRepository } from './interfaces/IPermissionRepository';

@Injectable()
export class PermissionRepository
  extends BaseRepository<PermissionEntity>
  implements IPermissionRepository<PermissionEntity>
{
  constructor(
    @InjectRepository(PermissionEntity) repo: Repository<PermissionEntity>,
  ) {
    super(repo);
  }

  async getByKey(key: string): Promise<PermissionEntity | null> {
    return await this.repository.findOneBy({ key });
  }

  async getByIds(ids: number[]): Promise<PermissionEntity[]> {
    if (!ids?.length) return [];
    return await this.repository.findBy({ id: In(ids) });
  }
}
