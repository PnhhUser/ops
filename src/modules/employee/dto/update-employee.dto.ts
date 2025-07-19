import { Min, IsInt } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { CreateEmployeeDTO } from './create-employee.dto';

export class UpdateEmployeeDTO extends CreateEmployeeDTO {
  @Min(1, { message: ErrorMessages.position.ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.position.ID_NOT_INTEGER })
  employeeId: number;

  static override toEntity(dto: UpdateEmployeeDTO): EmployeeEntity {
    const employee = super.toEntity(dto);

    employee.id = dto.employeeId;

    return employee;
  }
}
