import { DepartmentEntity } from 'src/database/entities/department.entity';
import { IDepartmentService } from './interfaces/IDepartmentService';
import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { IDepartmentRepository } from 'src/database/repositories/interfaces/IDepartmentRepository';

@Injectable()
export class DepartmentService implements IDepartmentService {
  constructor(
    @Inject('IDepartmentRepository')
    private readonly departmentRepository: IDepartmentRepository<DepartmentEntity>,
  ) {}

  async getDepartments(): Promise<DepartmentEntity[] | null> {
    return await this.departmentRepository.getAll();
  }

  async addDepartment(dto: CreateDepartmentDTO): Promise<void> {
    const exists = await this.departmentRepository.getByName(dto.name);

    if (exists) {
      throw ExceptionSerializer.conflict('This department already exists');
    }

    const department = CreateDepartmentDTO.toEnity(dto);

    await this.departmentRepository.add(department);
  }

  async updateDepartment(dto: UpdateDepartmentDTO): Promise<void> {
    const department = await this.departmentRepository.getById(
      dto.departmentId,
    );

    if (!department) {
      throw ExceptionSerializer.notFound('Department not found');
    }

    const duplicate = await this.departmentRepository.getByName(dto.name);

    if (duplicate && duplicate.id !== dto.departmentId) {
      throw ExceptionSerializer.conflict('This department already exists');
    }

    const updated = UpdateDepartmentDTO.toEnity(dto);

    await this.departmentRepository.update(updated);
  }

  async removeDepartment(departmentId: number): Promise<void> {
    const department = await this.departmentRepository.getById(departmentId);

    if (!department) {
      throw ExceptionSerializer.notFound('Department not found');
    }

    await this.departmentRepository.delete(departmentId);
  }
}
