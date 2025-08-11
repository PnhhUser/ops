import { IsInt, Min, IsArray } from 'class-validator';

export class RolePermissionDTO {
  @IsInt()
  @Min(1)
  roleId: number;

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  permissionIds: number[];
}
