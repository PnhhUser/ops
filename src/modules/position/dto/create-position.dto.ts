import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  ValidateIf,
  Max,
} from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { DepartmentEntity } from 'src/database/entities/department.entity';
import { PositionEntity } from 'src/database/entities/position.entity';

const MAX_SALARY = 2_000_000_000;
export class CreatePositionDTO {
  @IsString({ message: ErrorMessages.position.NAME_INVALID })
  @IsNotEmpty({ message: ErrorMessages.position.NAME_EMPTY })
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString({ message: ErrorMessages.position.DESCRIPTION_INVALID })
  description: string | null;

  @ValidateIf((_, value) => value !== null)
  @Max(MAX_SALARY, {
    message: `Lương không được vượt quá ${MAX_SALARY.toLocaleString()} VNĐ`,
  })
  @IsNumber({}, { message: ErrorMessages.position.BASE_SALARY_INVALID })
  baseSalary: number | null;

  @IsString()
  @IsNotEmpty()
  key: string;

  @ValidateIf((_, value) => value !== null)
  @IsInt()
  departmentId: number | null;

  static toEntity(dto: CreatePositionDTO): PositionEntity {
    const entity = new PositionEntity();

    entity.name = dto.name;
    entity.key = dto.key;
    entity.description = !dto.description?.trim() ? null : dto.description;
    entity.baseSalary = dto.baseSalary;

    entity.department =
      dto.departmentId !== null
        ? ({ id: dto.departmentId } as DepartmentEntity)
        : null;

    return entity;
  }
}
