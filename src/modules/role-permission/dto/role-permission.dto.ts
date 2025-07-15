import { IsInt, Min, IsArray, ArrayNotEmpty } from 'class-validator';

export class RolePermissionDTO {
  @IsInt()
  @Min(1)
  roleId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  permissionIds: number[];
}
