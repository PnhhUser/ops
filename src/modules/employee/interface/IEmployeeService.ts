import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';
import { AccountEntity } from 'src/database/entities/account.entity';

export interface IEmployeeService {
  getEmployees(): Promise<EmployeeEntity[] | null>;

  addEmployee(newEmployee: CreateEmployeeDTO): Promise<EmployeeEntity | null>;

  updateEmployee(
    updateEmployee: UpdateEmployeeDTO,
  ): Promise<EmployeeEntity | null>;

  removeEmployee(employeeId: number): Promise<void>;

  accountsAvailable(): Promise<AccountEntity[]>;
}
