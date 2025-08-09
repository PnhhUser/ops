import { CreatePermissionDTO } from '../dto/create-permission.dto';
import { UpdatePermissionDTO } from '../dto/update-permission.dto';

export interface IPermissionService<T> {
  getPermissions(): Promise<T[]>;

  addPermission(newPermission: CreatePermissionDTO): Promise<T | null>;

  updatePermission(updatePermission: UpdatePermissionDTO): Promise<T | null>;

  removePermission(permissionId: number): Promise<void>;
}
