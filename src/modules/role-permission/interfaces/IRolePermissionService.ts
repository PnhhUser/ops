import { PermissionEntity } from 'src/database/entities/permission.entity';

export interface IRolePermissionService {
  assignPermissions(roleId: number, permissionIds: number[]): Promise<void>;

  removePermission(roleId: number, permissionId: number): Promise<void>;

  updatePermissionsForRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<void>;

  getPermissionsByRole(roleId: number): Promise<PermissionEntity[]>;
}
