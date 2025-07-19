import { IsInt, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { PositionEntity } from 'src/database/entities/position.entity';
import { CreatePositionDTO } from './create-position.dto';

export class UpdatePositionDTO extends CreatePositionDTO {
  @Min(1, { message: ErrorMessages.position.ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.position.ID_NOT_INTEGER })
  positionId: number;

  static override toEntity(dto: UpdatePositionDTO): PositionEntity {
    const position = super.toEntity(dto);
    position.id = dto.positionId;

    return position;
  }
}
