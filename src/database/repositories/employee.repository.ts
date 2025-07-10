import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
@Injectable()
export class EmployeeRepository extends BaseRepository<EmployeeEntity> {
  constructor(
    @InjectRepository(EmployeeEntity) repo: Repository<EmployeeEntity>,
  ) {
    super(repo);
  }
}
