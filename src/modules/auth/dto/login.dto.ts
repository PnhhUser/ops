import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  PASSWORD_LENGTH,
  USERNAME_LENGTH,
} from 'src/common/constants/base.constant';
import { ErrorMessages } from 'src/common/constants/error-message.constant';

export class LoginDTO {
  @MinLength(USERNAME_LENGTH, {
    message: ErrorMessages.account.USERNAME_TOO_SHORT,
  })
  @IsString({ message: ErrorMessages.account.USERNAME_INVALID })
  @IsNotEmpty({ message: ErrorMessages.account.USERNAME_EMPTY })
  username: string;

  @MinLength(PASSWORD_LENGTH, {
    message: ErrorMessages.account.PASSWORD_TOO_SHORT,
  })
  @IsString({ message: ErrorMessages.account.PASSWORD_INVALID })
  @IsNotEmpty({ message: ErrorMessages.account.PASSWORD_EMPTY })
  password: string;
}
