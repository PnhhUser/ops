import { Inject, Injectable } from '@nestjs/common';
import { IRolePermissionService } from './interfaces/IRolePermissionService';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { PermissionEntity } from 'src/database/entities/permission.entity';
import { RolePermissionMappingEntity } from 'src/database/entities/role-permission-mapping.entity';
import { IRoleRepository } from 'src/database/repositories/interfaces/IRoleRepository';
import { RoleEntity } from 'src/database/entities/role.entity';
import { IRolePermissionRepository } from 'src/database/repositories/interfaces/IRolePermissionRepository';
import { IPermissionRepository } from 'src/database/repositories/interfaces/IPermissionRepository';

@Injectable()
export class RolePermissionService implements IRolePermissionService {
  constructor(
    @Inject('IRolePermissionRepository')
    private readonly rolePermissionRepository: IRolePermissionRepository<RolePermissionMappingEntity>,
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository<RoleEntity>,
    @Inject('IPermissionRepository')
    private readonly permissionRepository: IPermissionRepository<PermissionEntity>,
  ) {}

  async assignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    if (!permissionIds || permissionIds.length === 0) return;

    const role = await this.roleRepository.getById(roleId);

    if (!role) {
      throw ExceptionSerializer.notFound('Role not found');
    }

    // Kiểm tra tất cả permissionId có tồn tại
    for (const permissionId of permissionIds) {
      const permission = await this.permissionRepository.getById(permissionId);
      if (!permission) {
        throw ExceptionSerializer.notFound(
          `Permission ${permissionId} not found`,
        );
      }
    }

    const mappingsToCreate: RolePermissionMappingEntity[] = [];

    for (const permissionId of permissionIds) {
      const exists = await this.rolePermissionRepository.findMapping(
        roleId,
        permissionId,
      );

      if (!exists) {
        mappingsToCreate.push(
          this.rolePermissionRepository.createMapping(roleId, permissionId),
        );
      }
    }

    if (mappingsToCreate.length > 0) {
      await this.rolePermissionRepository.save(mappingsToCreate);
    }
  }

  async updatePermissionsForRole(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    // Xoá toàn bộ quyền hiện có của role
    await this.rolePermissionRepository.deleteAllRoleId(roleId);

    if (permissionIds.length === 0) {
      return;
    }

    const mappings = permissionIds.map((permissionId) => {
      return this.rolePermissionRepository.createMapping(roleId, permissionId);
    });

    await this.rolePermissionRepository.save(mappings);
  }

  async removePermission(roleId: number, permissionId: number): Promise<void> {
    const exists = await this.rolePermissionRepository.findMapping(
      roleId,
      permissionId,
    );

    if (!exists) {
      throw ExceptionSerializer.notFound('Mapping not found');
    }

    await this.rolePermissionRepository.deletePermission(roleId, permissionId);
  }

  async getPermissionsByRole(roleId: number): Promise<PermissionEntity[]> {
    return await this.rolePermissionRepository.getPermissionsByRole(roleId);
  }
}
