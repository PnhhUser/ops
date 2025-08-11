import { PermissionEntity } from 'src/database/entities/permission.entity';

export interface IRolePermissionRepository<T> {
  findMapping(roleId: number, permissionId: number): Promise<T | null>;

  createMapping(roleId: number, permissionId: number): T;

  deleteAllRoleId(roleId: number): Promise<void>;

  save(entities: T[]): Promise<void>;

  save(entity: T): Promise<void>;

  deletePermission(roleId: number, permissionId: number): Promise<void>;

  getPermissionsByRole(roleId: number): Promise<PermissionEntity[]>;

  getMappingsByRole(roleId: number): Promise<T[]>;
}
