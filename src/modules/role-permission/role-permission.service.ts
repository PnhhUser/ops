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

  async assignPermissions(roleId: number, permissionIds: number[]) {
    if (!permissionIds || permissionIds.length === 0) return [];

    const role = await this.roleRepository.getById(roleId);
    if (!role) {
      throw ExceptionSerializer.notFound('Role not found');
    }

    // Kiểm tra tất cả permissionId có tồn tại
    const permissions = await this.permissionRepository.getByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw ExceptionSerializer.notFound('Some permissions not found');
    }

    // Lấy toàn bộ mapping hiện tại của role (1 query duy nhất)
    const existingMappings =
      await this.rolePermissionRepository.getMappingsByRole(roleId);
    const existingPermissionIds = new Set(
      existingMappings.map((m) => m.permissionId),
    );

    // Tạo mapping mới chỉ cho những permission chưa có
    const mappingsToCreate = permissionIds
      .filter((id) => !existingPermissionIds.has(id))
      .map((id) => this.rolePermissionRepository.createMapping(roleId, id));

    if (mappingsToCreate.length > 0) {
      await this.rolePermissionRepository.save(mappingsToCreate);
    }

    return await this.rolePermissionRepository.getPermissionsByRole(roleId);
  }

  async updatePermissionsForRole(roleId: number, permissionIds: number[]) {
    const role = await this.roleRepository.getById(roleId);

    if (!role) {
      throw ExceptionSerializer.notFound('Role not found');
    }

    // Loại bỏ id trùng nhau
    permissionIds = [...new Set(permissionIds)];

    // Kiểm tra tồn tại
    const permissions = await this.permissionRepository.getByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw ExceptionSerializer.notFound('Some permissions not found');
    }

    // Xoá toàn bộ quyền cũ
    await this.rolePermissionRepository.deleteAllRoleId(roleId);

    // Tạo mapping mới
    const mappings = permissionIds.map((id) =>
      this.rolePermissionRepository.createMapping(roleId, id),
    );

    await this.rolePermissionRepository.save(mappings);

    return await this.rolePermissionRepository.getPermissionsByRole(roleId);
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
    const role = await this.roleRepository.getById(roleId);

    if (!role) {
      throw ExceptionSerializer.notFound('Role not found');
    }

    return await this.rolePermissionRepository.getPermissionsByRole(roleId);
  }

  async saveRolePermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<PermissionEntity[]> {
    const role = await this.roleRepository.getById(roleId);
    if (!role) {
      throw ExceptionSerializer.notFound('Role not found');
    }

    const permissions = await this.permissionRepository.getByIds(permissionIds);
    if (permissions.length !== permissionIds.length) {
      throw ExceptionSerializer.notFound('Some permissions not found');
    }

    // xóa toàn bộ mapping hiện tại
    await this.rolePermissionRepository.deleteAllRoleId(roleId);

    // tạo mapping mới
    const mappings = permissionIds.map((id) =>
      this.rolePermissionRepository.createMapping(roleId, id),
    );

    await this.rolePermissionRepository.save(mappings);

    return await this.rolePermissionRepository.getPermissionsByRole(roleId);
  }
}
