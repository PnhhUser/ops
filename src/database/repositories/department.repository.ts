import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { BaseRepository } from './base.repository';
import { IDepartmentRepository } from './interfaces/IDepartmentRepository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentRepository
  extends BaseRepository<DepartmentEntity>
  implements IDepartmentRepository<DepartmentEntity>
{
  constructor(
    @InjectRepository(DepartmentEntity) repo: Repository<DepartmentEntity>,
  ) {
    super(repo);
  }

  async getByName(name: string): Promise<DepartmentEntity | null> {
    return await this.repository.findOneBy({ name });
  }

  async getByKey(key: string): Promise<DepartmentEntity | null> {
    return await this.repository.findOneBy({ key });
  }
}
