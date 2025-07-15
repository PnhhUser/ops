import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';

export interface IRoleService<T> {
  getRoles(): Promise<T[] | null>;

  addRole(newRole: CreateRoleDTO): Promise<void>;

  updateRole(updateRole: UpdateRoleDTO): Promise<void>;

  removeRole(roleId: number): Promise<void>;
}
