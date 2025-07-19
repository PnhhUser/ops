import { DepartmentEntity } from 'src/database/entities/department.entity';
import { CreateDepartmentDTO } from './create-department.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateDepartmentDTO extends CreateDepartmentDTO {
  @Min(1)
  @IsInt()
  departmentId: number;

  static override toEnity(dto: UpdateDepartmentDTO): DepartmentEntity {
    const enitty = super.toEnity(dto);

    enitty.id = dto.departmentId;

    return enitty;
  }
}
