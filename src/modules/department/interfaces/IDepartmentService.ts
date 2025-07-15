import { DepartmentEntity } from 'src/database/entities/department.entity';
import { CreateDepartmentDTO } from '../dto/create-department.dto';
import { UpdateDepartmentDTO } from '../dto/update-department.dto';

export interface IDepartmentService {
  getDepartments(): Promise<DepartmentEntity[] | null>;

  addDepartment(dto: CreateDepartmentDTO): Promise<void>;

  updateDepartment(dto: UpdateDepartmentDTO): Promise<void>;

  removeDepartment(departmentId: number): Promise<void>;
}
