import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';

export interface IRoleService<T> {
  getRoles(): Promise<T[]>;

  addRole(newRole: CreateRoleDTO): Promise<T | null>;

  updateRole(updateRole: UpdateRoleDTO): Promise<T | null>;

  removeRole(roleId: number): Promise<void>;
}
