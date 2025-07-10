import { IsNotEmpty, MinLength, IsInt, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { AccountEntity } from 'src/database/entities/account.entity';
import * as bcrypt from 'bcrypt';

export class UpdateAccountDTO {
  @IsInt({ message: ErrorMessages.Auth.ACCOUNT_ID_NOT_INTEGER })
  @Min(1, { message: ErrorMessages.Auth.ACCOUNT_ID_TOO_SMALL })
  accountId: number;

  @IsNotEmpty({ message: ErrorMessages.Auth.USERNAME_EMPTY })
  @MinLength(3, { message: ErrorMessages.Auth.USERNAME_TOO_SHORT })
  username: string;

  @IsNotEmpty({ message: ErrorMessages.Auth.PASSWORD_EMPTY })
  @MinLength(6, { message: ErrorMessages.Auth.PASSWORD_TOO_SHORT })
  password: string;

  static async toEntity(dto: UpdateAccountDTO): Promise<AccountEntity> {
    const account = new AccountEntity();
    account.id = dto.accountId;
    account.username = dto.username;
    account.password = await bcrypt.hash(dto.password, 10);
    return account;
  }
}
