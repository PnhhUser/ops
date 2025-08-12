import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { DepartmentEntity } from 'src/database/entities/department.entity';

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description: string | null;

  @IsString()
  @IsNotEmpty()
  key: string;

  static toEntity(dto: CreateDepartmentDTO): DepartmentEntity {
    const entity = new DepartmentEntity();

    entity.name = dto.name;
    entity.key = dto.key;
    entity.description = !dto.description?.trim() ? null : dto.description;

    return entity;
  }
}
