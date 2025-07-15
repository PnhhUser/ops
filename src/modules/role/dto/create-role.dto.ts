import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { REGEX_NOT_ALL_NUMBER } from 'src/common/constants/base.constant';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { RoleEntity } from 'src/database/entities/role.entity';

export class CreateRoleDTO {
  @Matches(REGEX_NOT_ALL_NUMBER, {
    message: ErrorMessages.permission.KEY_ALL_NUMBER,
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string | null;

  static toEntity(dto: CreateRoleDTO): RoleEntity {
    const entity = new RoleEntity();

    entity.key = dto.key;
    entity.name = dto.name; // Tên hiển thị
    entity.description = !dto.description?.trim() ? null : dto.description;

    return entity;
  }
}
