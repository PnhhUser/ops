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

  static toEntity(dto: CreatePositionDTO): PositionEntity {
    const position = new PositionEntity();

    position.name = dto.name;
    position.description = !dto.description?.trim() ? null : dto.description;
    position.baseSalary = dto.baseSalary;

    return position;
  }
}
