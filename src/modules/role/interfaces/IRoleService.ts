import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';

export interface IRoleService<T> {
  getRoles(): Promise<T[] | null>;

  addRole(newRole: CreateRoleDTO): Promise<T>;

  updateRole(updateRole: UpdateRoleDTO): Promise<T>;

  removeRole(roleId: number): Promise<void>;
}
