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

  async getDepartments(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.getAll();
  }

  async addDepartment(
    dto: CreateDepartmentDTO,
  ): Promise<DepartmentEntity | null> {
    const [existName, existKey] = await Promise.all([
      this.departmentRepository.getByName(dto.name),
      this.departmentRepository.getByKey(dto.key),
    ]);

    if (existName) {
      throw ExceptionSerializer.conflict(
        `Department name '${existName.name}' already exists`,
      );
    }

    if (existKey) {
      throw ExceptionSerializer.conflict(
        `Department key '${existKey.key}' already exists`,
      );
    }

    const department = CreateDepartmentDTO.toEnity(dto);

    await this.departmentRepository.add(department);

    return await this.departmentRepository.getById(department.id);
  }

  async updateDepartment(
    dto: UpdateDepartmentDTO,
  ): Promise<DepartmentEntity | null> {
    const department = await this.departmentRepository.getById(
      dto.departmentId,
    );

    if (!department) {
      throw ExceptionSerializer.notFound('Department not found');
    }

    const duplicate = await this.departmentRepository.getByName(dto.name);

    if (duplicate) {
      const isSameNameButDifferentId = duplicate.id !== dto.departmentId;

      if (isSameNameButDifferentId) {
        throw ExceptionSerializer.conflict('This department already exists');
      }
    }

    const keyExists = await this.departmentRepository.getByKey(dto.key);

    if (keyExists && keyExists.id !== dto.departmentId) {
      throw ExceptionSerializer.conflict('This department already exists');
    }

    const updated = UpdateDepartmentDTO.toEnity(dto);

    await this.departmentRepository.update(updated);

    return await this.departmentRepository.getById(updated.id);
  }

  async removeDepartment(departmentId: number): Promise<void> {
    const department = await this.departmentRepository.getById(departmentId);

    if (!department) {
      throw ExceptionSerializer.notFound('Department not found');
    }

    await this.departmentRepository.delete(departmentId);
  }
}
