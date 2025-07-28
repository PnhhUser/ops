import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { AccountEntity } from 'src/database/entities/account.entity';
import * as bcrypt from 'bcrypt';
import {
  PASSWORD_LENGTH,
  REGEX_NOT_ALL_NUMBER,
  USERNAME_LENGTH,
} from 'src/common/constants/base.constant';
import { RoleEntity } from 'src/database/entities/role.entity';

export class CreateAccountDTO {
  @MinLength(USERNAME_LENGTH, {
    message: ErrorMessages.account.USERNAME_TOO_SHORT,
  })
  @Matches(REGEX_NOT_ALL_NUMBER, {
    message: ErrorMessages.account.USERNAME_ALL_NUMBER,
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

  @IsBoolean()
  active: boolean;

  @Min(1)
  @IsInt()
  role: number;

  static async toEntity(dto: CreateAccountDTO): Promise<AccountEntity> {
    const account = new AccountEntity();
    account.username = dto.username;
    account.password = await bcrypt.hash(dto.password, 10);
    account.isActive = dto.active;

    if (dto.role) {
      const role = new RoleEntity();
      role.id = dto.role;
      account.role = role;
    }

    return account;
  }
}
