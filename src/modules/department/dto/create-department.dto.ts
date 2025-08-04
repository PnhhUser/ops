import { IsNotEmpty, IsString } from 'class-validator';
import { DepartmentEntity } from 'src/database/entities/department.entity';

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string | null;

  @IsString()
  @IsNotEmpty()
  key: string;

  static toEnity(dto: CreateDepartmentDTO): DepartmentEntity {
    const entity = new DepartmentEntity();

    entity.name = dto.name;
    entity.key = dto.key;
    entity.description = !dto.description?.trim() ? null : dto.description;

    return entity;
  }
}
