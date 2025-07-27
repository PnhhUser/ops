import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { IEmployeeRepository } from './interfaces/IEmployeeRepository';
@Injectable()
export class EmployeeRepository
  extends BaseRepository<EmployeeEntity>
  implements IEmployeeRepository<EmployeeEntity>
{
  constructor(
    @InjectRepository(EmployeeEntity) repo: Repository<EmployeeEntity>,
  ) {
    super(repo);
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
}
