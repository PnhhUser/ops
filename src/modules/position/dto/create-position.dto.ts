import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { PositionEntity } from 'src/database/entities/position.entity';

export class CreatePositionDTO {
  @IsString({ message: ErrorMessages.position.NAME_INVALID })
  @IsNotEmpty({ message: ErrorMessages.position.NAME_EMPTY })
  name: string;

  @IsOptional()
  @IsString({ message: ErrorMessages.position.DESCRIPTION_INVALID })
  description: string | null;

  @IsOptional()
  @IsNumber({}, { message: ErrorMessages.position.BASE_SALARY_INVALID })
  baseSalary: number | null;

  @IsString()
  @IsNotEmpty()
  key: string;

  static toEntity(dto: CreatePositionDTO): PositionEntity {
    const entity = new PositionEntity();

    entity.name = dto.name;
    entity.key = dto.key;
    entity.description = !dto.description?.trim() ? null : dto.description;
    entity.baseSalary = dto.baseSalary;

    return entity;
  }
}
