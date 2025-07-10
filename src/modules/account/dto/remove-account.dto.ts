import { IsInt, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';

export class RemoveAccountDTO {
  @IsInt({ message: ErrorMessages.Auth.ACCOUNT_ID_NOT_INTEGER })
  @Min(1, { message: ErrorMessages.Auth.ACCOUNT_ID_TOO_SMALL })
  accountId: number;
}
