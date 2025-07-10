import { IsNotEmpty, MinLength } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';

export class LoginDTO {
  @IsNotEmpty({ message: ErrorMessages.Auth.USERNAME_EMPTY })
  @MinLength(3, { message: ErrorMessages.Auth.USERNAME_TOO_SHORT })
  username: string;

  @IsNotEmpty({ message: ErrorMessages.Auth.PASSWORD_EMPTY })
  @MinLength(6, { message: ErrorMessages.Auth.PASSWORD_TOO_SHORT })
  password: string;
}
