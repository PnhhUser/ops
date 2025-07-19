import { CreatePermissionDTO } from '../dto/create-permission.dto';
import { UpdatePermissionDTO } from '../dto/update-permission.dto';

export interface IPermissionService<T> {
  getPermissions(): Promise<T[] | null>;

  addPermission(newPermission: CreatePermissionDTO): Promise<void>;

  updatePermission(updatePermission: UpdatePermissionDTO): Promise<void>;

  removePermission(permissionId: number): Promise<void>;
}
