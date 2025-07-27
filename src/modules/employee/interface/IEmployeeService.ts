import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';

export interface IEmployeeService {
  getEmployees(): Promise<EmployeeEntity[] | null>;

  addEmployee(newEmployee: CreateEmployeeDTO): Promise<EmployeeEntity>;

  updateEmployee(updateEmployee: UpdateEmployeeDTO): Promise<EmployeeEntity>;

  removeEmployee(employeeId: number): Promise<void>;
}
