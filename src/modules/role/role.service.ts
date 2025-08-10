import { IRoleService } from './interfaces/IRoleService';
import { RoleEntity } from 'src/database/entities/role.entity';
import { CreateRoleDTO } from './dto/create-role.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/database/repositories/interfaces/IRoleRepository';
import { RoleType } from 'src/common/constants/enums/role.enum';

@Injectable()
export class RoleService implements IRoleService<RoleEntity> {
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository<RoleEntity>,
  ) {}

  async getRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.getAll();
  }

  async addRole(newRole: CreateRoleDTO) {
    const keyExists = await this.roleRepository.getByKey(newRole.key);

    if (keyExists) {
      throw ExceptionSerializer.conflict(ErrorMessages.role.ROLE_EXISTS);
    }

    const created = CreateRoleDTO.toEntity(newRole);

    await this.roleRepository.add(created);

    return await this.roleRepository.getById(created.id);
  }

  async updateRole(updateRole: UpdateRoleDTO) {
    const roleExists = await this.roleRepository.getById(updateRole.roleId);

    if (!roleExists) {
      throw ExceptionSerializer.notFound(ErrorMessages.role.ROLE_NOT_FOUND);
    }

    // Thêm kiểm tra role hệ thống
    if (roleExists.type === RoleType.SYSTEM) {
      throw ExceptionSerializer.forbidden('Cannot update system role');
    }

    const keyExists = await this.roleRepository.getByKey(updateRole.key);

    if (keyExists && keyExists.id !== updateRole.roleId) {
      throw ExceptionSerializer.conflict(ErrorMessages.role.ROLE_EXISTS);
    }

    const updated = UpdateRoleDTO.toEntity(updateRole);

    await this.roleRepository.update(updated);

    return await this.roleRepository.getById(updated.id);
  }

  async removeRole(roleId: number): Promise<void> {
    // Validate input
    if (!Number.isInteger(roleId)) {
      throw ExceptionSerializer.badRequest(ErrorMessages.role.ID_NOT_INTEGER);
    }

    if (roleId <= 0) {
      throw ExceptionSerializer.badRequest(ErrorMessages.role.ID_TOO_SMALL);
    }

    // Check role existence
    const roleExists = await this.roleRepository.getById(roleId);
    if (!roleExists) {
      throw ExceptionSerializer.notFound(ErrorMessages.role.ROLE_NOT_FOUND);
    }

    // Prevent deleting system roles
    if (roleExists.type === RoleType.SYSTEM) {
      throw ExceptionSerializer.forbidden('Cannot delete system role');
    }

    // Check if role is in use
    const accountCount =
      await this.roleRepository.countAccountsUsingRole(roleId);
    if (accountCount > 0) {
      throw ExceptionSerializer.conflict(
        'Cannot delete role with accounts using it. Accounts count: ' +
          accountCount,
      );
    }

    // Perform deletion
    await this.roleRepository.delete(roleId);
  }
}
