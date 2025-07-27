import { CreatePermissionDTO } from '../dto/create-permission.dto';
import { UpdatePermissionDTO } from '../dto/update-permission.dto';

export interface IPermissionService<T> {
  getPermissions(): Promise<T[] | null>;

  addPermission(newPermission: CreatePermissionDTO): Promise<T>;

  updatePermission(updatePermission: UpdatePermissionDTO): Promise<T>;

  removePermission(permissionId: number): Promise<void>;
}
