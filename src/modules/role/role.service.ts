import { IRoleService } from './interfaces/IRoleService';
import { RoleEntity } from 'src/database/entities/role.entity';
import { CreateRoleDTO } from './dto/create-role.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/database/repositories/interfaces/IRoleRepository';

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

    const keyExists = await this.roleRepository.getByKey(updateRole.key);

    if (keyExists && keyExists.id !== updateRole.roleId) {
      throw ExceptionSerializer.conflict(ErrorMessages.role.ROLE_EXISTS);
    }

    const updated = UpdateRoleDTO.toEntity(updateRole);

    await this.roleRepository.update(updated);

    return await this.roleRepository.getById(updated.id);
  }

  async removeRole(roleId: number): Promise<void> {
    if (typeof roleId !== 'number') {
      throw ExceptionSerializer.badRequest(ErrorMessages.role.ID_NOT_INTEGER);
    }

    if (roleId <= 0) {
      throw ExceptionSerializer.badRequest(ErrorMessages.role.ID_TOO_SMALL);
    }

    const roleExists = await this.roleRepository.getById(roleId);

    if (!roleExists) {
      throw ExceptionSerializer.notFound(ErrorMessages.role.ROLE_NOT_FOUND);
    }

    await this.roleRepository.delete(roleId);
  }
}
