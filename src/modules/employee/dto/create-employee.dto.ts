import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Min,
  IsInt,
  IsPhoneNumber,
  Matches,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Gender } from 'src/common/constants/enums/employee.enum';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { PositionEntity } from 'src/database/entities/position.entity';
import { AccountEntity } from 'src/database/entities/account.entity';
import { REGEX_NOT_ALL_NUMBER } from 'src/common/constants/base.constant';

export class CreateEmployeeDTO {
  @Matches(REGEX_NOT_ALL_NUMBER, {
    message: ErrorMessages.employee.FULLNAME_ALL_NUMBER,
  })
  @IsString({ message: ErrorMessages.employee.FULLNAME_INVALID })
  @IsNotEmpty({ message: ErrorMessages.employee.FULLNAME_EMPTY })
  fullName: string;

  @IsEmail({}, { message: ErrorMessages.employee.EMAIL_INVALID })
  @IsString()
  @IsNotEmpty({ message: ErrorMessages.employee.EMAIL_EMPTY })
  email: string;

  @Transform(({ value }: { value: string | null }) =>
    value === '' ? null : value,
  )
  @IsOptional()
  @IsPhoneNumber('VN', { message: ErrorMessages.employee.PHONE_INVALID })
  @IsString({ message: ErrorMessages.employee.PHONE_NOT_STRING })
  phoneNumber: string | null;

  @IsOptional()
  @IsString({ message: ErrorMessages.employee.ADDRESS_INVALID })
  address: string | null;

  @IsEnum(Gender, { message: ErrorMessages.employee.GENDER_INVALID })
  gender: Gender;

  @IsOptional()
  @Transform(({ value }: { value: string | null }) =>
    value === '' || value === null ? null : value,
  )
  @Type(() => Date)
  @IsDate({ message: ErrorMessages.employee.DOB_INVALID })
  dateOfBirth: Date | null;

  @IsOptional()
  @Min(1, { message: ErrorMessages.position.ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.position.ID_NOT_INTEGER })
  positionId: number | null;

  @IsOptional()
  @Transform(({ value }: { value: string | null }) =>
    value === '' || value === null ? null : value,
  )
  @Type(() => Date)
  @IsDate({ message: ErrorMessages.employee.START_DATE_INVALID })
  startDate: Date | null;

  @IsOptional()
  @Min(1, { message: ErrorMessages.account.ACCOUNT_ID_TOO_SMALL })
  @IsInt({ message: ErrorMessages.account.ACCOUNT_ID_NOT_INTEGER })
  accountId: number | null;

  @IsOptional()
  @IsBoolean({ message: ErrorMessages.employee.IS_ACTIVE_INVALID })
  isActive: boolean | null;

  static toEntity(dto: CreateEmployeeDTO): EmployeeEntity {
    const employee = new EmployeeEntity();

    employee.fullName = dto.fullName;
    employee.email = dto.email;
    employee.phoneNumber = dto.phoneNumber ?? null;
    employee.address = !dto.address?.trim() ? null : dto.address;
    employee.gender = dto.gender;
    employee.dateOfBirth = dto.dateOfBirth ?? null;
    employee.startDate = dto.startDate ?? null;
    employee.isActive = dto.isActive ?? true;

    if (dto.positionId) {
      const position = new PositionEntity();
      position.id = dto.positionId;
      employee.position = position;
    } else {
      employee.position = null;
    }

    if (dto.accountId) {
      const account = new AccountEntity();
      account.id = dto.accountId;
      employee.account = account;
    } else {
      employee.account = null;
    }

    return employee;
  }
}
