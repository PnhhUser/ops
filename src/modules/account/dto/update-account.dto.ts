import { IsInt, Min } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { AccountEntity } from 'src/database/entities/account.entity';
import { ID_LENGTH } from 'src/common/constants/base.constant';
import { CreateAccountDTO } from './create-account.dto';

export class UpdateAccountDTO extends CreateAccountDTO {
  @Min(ID_LENGTH, { message: ErrorMessages.account.ACCOUNT_ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.account.ACCOUNT_ID_NOT_INTEGER })
  accountId: number;

  static override async toEntity(
    dto: UpdateAccountDTO,
  ): Promise<AccountEntity> {
    const account = await super.toEntity(dto);
    account.id = dto.accountId;
    return account;
  }
}
