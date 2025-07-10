import { IsInt, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';

export class RemovePositionDTO {
  @IsInt({ message: ErrorMessages.position.ID_NOT_INTEGER })
  @Min(1, { message: ErrorMessages.position.ID_TOO_SMALL })
  positionId: number;
}
