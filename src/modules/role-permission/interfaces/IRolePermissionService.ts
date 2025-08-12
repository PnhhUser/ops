import { PermissionEntity } from 'src/database/entities/permission.entity';

export interface IRolePermissionService {
  assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<PermissionEntity[]>;

  removePermission(roleId: number, permissionId: number): Promise<void>;

  updatePermissionsForRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<PermissionEntity[]>;

  getPermissionsByRole(roleId: number): Promise<PermissionEntity[]>;

  saveRolePermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<PermissionEntity[]>;

  hasPermission(roleId: number, permissionId: number): Promise<boolean>;
}
