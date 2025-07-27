import { DepartmentEntity } from 'src/database/entities/department.entity';
import { CreateDepartmentDTO } from '../dto/create-department.dto';
import { UpdateDepartmentDTO } from '../dto/update-department.dto';

export interface IDepartmentService {
  getDepartments(): Promise<DepartmentEntity[] | null>;

  addDepartment(dto: CreateDepartmentDTO): Promise<DepartmentEntity>;

  updateDepartment(dto: UpdateDepartmentDTO): Promise<DepartmentEntity>;

  removeDepartment(departmentId: number): Promise<void>;
}
