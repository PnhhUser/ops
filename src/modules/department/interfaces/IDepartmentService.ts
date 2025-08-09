import { DepartmentEntity } from 'src/database/entities/department.entity';
import { CreateDepartmentDTO } from '../dto/create-department.dto';
import { UpdateDepartmentDTO } from '../dto/update-department.dto';

export interface IDepartmentService {
  getDepartments(): Promise<DepartmentEntity[]>;

  addDepartment(dto: CreateDepartmentDTO): Promise<DepartmentEntity | null>;

  updateDepartment(dto: UpdateDepartmentDTO): Promise<DepartmentEntity | null>;

  removeDepartment(departmentId: number): Promise<void>;
}
