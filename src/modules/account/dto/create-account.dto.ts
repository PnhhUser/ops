import { IsNotEmpty, MinLength } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { AccountEntity } from 'src/database/entities/account.entity';
import * as bcrypt from 'bcrypt';

export class CreateAccountDTO {
  @IsNotEmpty({ message: ErrorMessages.Auth.USERNAME_EMPTY })
  @MinLength(3, { message: ErrorMessages.Auth.USERNAME_TOO_SHORT })
  username: string;

  @IsNotEmpty({ message: ErrorMessages.Auth.PASSWORD_EMPTY })
  @MinLength(6, { message: ErrorMessages.Auth.PASSWORD_TOO_SHORT })
  password: string;

  static async toEntity(dto: CreateAccountDTO): Promise<AccountEntity> {
    const account = new AccountEntity();
    account.username = dto.username;
    account.password = await bcrypt.hash(dto.password, 10);
    return account;
  }
}
