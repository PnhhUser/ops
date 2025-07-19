import { IsInt, Min } from 'class-validator';
import { CreatePermissionDTO } from './create-permission.dto';
import { PermissionEntity } from 'src/database/entities/permission.entity';

export class UpdatePermissionDTO extends CreatePermissionDTO {
  @Min(1)
  @IsInt()
  permissionId: number;

  static override toEntity(dto: UpdatePermissionDTO): PermissionEntity {
    const entity = super.toEntity(dto);

    entity.id = dto.permissionId;

    return entity;
  }
}
