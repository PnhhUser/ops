import { DepartmentEntity } from 'src/database/entities/department.entity';
import { CreateDepartmentDTO } from './create-department.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateDepartmentDTO extends CreateDepartmentDTO {
  @Min(1)
  @IsInt()
  departmentId: number;

  static override toEntity(dto: UpdateDepartmentDTO): DepartmentEntity {
    const enitty = super.toEntity(dto);

    enitty.id = dto.departmentId;

    return enitty;
  }
}
