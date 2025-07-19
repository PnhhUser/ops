import { IsInt, Min } from 'class-validator';
import { RoleEntity } from 'src/database/entities/role.entity';
import { CreateRoleDTO } from './create-role.dto';

export class UpdateRoleDTO extends CreateRoleDTO {
  @Min(1)
  @IsInt()
  roleId: number;

  static override toEntity(dto: UpdateRoleDTO): RoleEntity {
    const entity = super.toEntity(dto);

    entity.id = dto.roleId;

    return entity;
  }
}
