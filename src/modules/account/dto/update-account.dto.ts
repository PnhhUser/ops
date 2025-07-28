import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { AccountEntity } from 'src/database/entities/account.entity';
import { ID_LENGTH } from 'src/common/constants/base.constant';
import { CreateAccountDTO } from './create-account.dto';
import * as bcrypt from 'bcrypt';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';

export class UpdateAccountDTO extends CreateAccountDTO {
  @Min(ID_LENGTH, { message: ErrorMessages.account.ACCOUNT_ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.account.ACCOUNT_ID_NOT_INTEGER })
  accountId: number;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  declare password: string;

  static override async toEntity(
    dto: UpdateAccountDTO,
  ): Promise<AccountEntity> {
    const account = await super.toEntity(dto);
    account.id = dto.accountId;

    if (dto.password && dto.password.trim() !== '') {
      if (dto.password.length < 6) {
        throw ExceptionSerializer.badRequest(
          ErrorMessages.account.PASSWORD_TOO_SHORT,
        );
      }

      account.password = await bcrypt.hash(dto.password, 10);
    }

    return account;
  }
}
