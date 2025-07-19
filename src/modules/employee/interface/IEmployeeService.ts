import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';

export interface IEmployeeService {
  getEmployees(): Promise<EmployeeEntity[] | null>;

  addEmployee(newEmployee: CreateEmployeeDTO): Promise<void>;

  updateEmployee(updateEmployee: UpdateEmployeeDTO): Promise<void>;

  removeEmployee(employeeId: number): Promise<void>;
}
