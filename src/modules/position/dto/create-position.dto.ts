import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { PositionEntity } from 'src/database/entities/position.entity';

export class CreatePositionDTO {
  @IsNotEmpty({ message: ErrorMessages.position.NAME_EMPTY })
  @IsString({ message: ErrorMessages.position.NAME_INVALID })
  name: string;

  @ValidateIf((o: CreatePositionDTO) => o.description !== undefined)
  @IsString({ message: ErrorMessages.position.DESCRIPTION_INVALID })
  description: string | null;

  @ValidateIf((o: CreatePositionDTO) => o.baseSalary !== undefined)
  @IsNumber({}, { message: ErrorMessages.position.BASE_SALARY_INVALID })
  baseSalary: number | null;

  static toEntity(dto: CreatePositionDTO): PositionEntity {
    const position = new PositionEntity();

    position.name = dto.name;
    position.description = !dto.description?.trim() ? null : dto.description;

    return position;
  }
}
